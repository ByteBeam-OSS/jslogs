const blessed = require('blessed');

async function loadChalk() {
  // Dynamically import chalk
  const chalk = (await import('chalk')).default;
  global.chalk = chalk;
  return chalk;
}

async function createJsLogs() {
  const chalk = await loadChalk();

// Helper function to format each message part
function formatMessagePart(part) {
  if (typeof part === 'object') {
    try {
      return chalk.cyan(JSON.stringify(part, null, 2));  // Prettify JSON output
    } catch (err) {
      return chalk.red('[Unprintable Object]');
    }
  } else {
    return part;
  }
}
  // Mapping for statuses to their respective icons and colors
  const statusMap = {
    success: { icon: '✔️', color: chalk.green },
    error: { icon: '❌', color: chalk.red },
    waiting: { icon: '⏳', color: chalk.yellow },
    info: { icon: 'ℹ️', color: chalk.blue },
    warning: { icon: '⚠️', color: chalk.yellow },
    0: { icon: '✔️', color: chalk.green },  // 0 as success
    1: { icon: '❌', color: chalk.red },     // 1 as error
    2: { icon: '⏳', color: chalk.yellow },  // 2 as waiting
    3: { icon: 'ℹ️', color: chalk.blue },   // 3 as info
    4: { icon: '⚠️', color: chalk.yellow }  // 4 as warning
  };
  //
  // Set up the jslogs object to be exported
  const jslogs = {
    debug: function (...messageParts) {
    //const statusDetails = statusMap[status] || { icon: '', color: chalk.white };
    const formattedMessage = messageParts.map(part => formatMessagePart(part)).join(' ');
    const debugMessage = chalk.yellow('[DEBUG] ') + formattedMessage;
    console.log(debugMessage);
  },

  init: function (status, ...descriptionParts) {
    const statusDetails = statusMap[status] || { icon: '', color: chalk.white };
    const formattedDescription = descriptionParts.map(part => formatMessagePart(part)).join(' ');
    const initMessage = chalk.blue('[INIT] ') + statusDetails.color(`${statusDetails.icon} ${formattedDescription}`);
    console.log(initMessage);
  },
      error: function (...messageParts) {
    const formattedMessage = messageParts.map(part => formatMessagePart(part)).join(' ');
    const errorMessage = chalk.red.bold('[ERROR] ') + chalk.red(formattedMessage);
    console.error(errorMessage);
  },
  };

  return jslogs;
}

// Export the createJsLogs function to be used elsewhere
module.exports = {
  createJsLogs,
};
