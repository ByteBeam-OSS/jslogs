import fs from 'fs';
import path from 'path';

const loadChalk = async () => {
  const chalk = (await import('chalk')).default;
  global.chalk = chalk;
  return chalk;
};

// Helper to format message parts
const formatMessagePart = (part) => {
  if (typeof part === 'object') {
    try {
      return JSON.stringify(part, null, 2);  // Prettify JSON output
    } catch (err) {
      return '[Unprintable Object]';
    }
  }
  return part;
};

// Logger function
const createLogger = async ({ jsonOutput = false, file = null, writethrough = true, useVerbal = false } = {}) => {
  const chalk = await loadChalk();

  // Define status map for icons, colors, and verbal descriptions
  const statusMap = {
    success: { icon: '✔', color: chalk.green, text: 'success' },
    error: { icon: '❌', color: chalk.red, text: 'error' },
    waiting: { icon: '⏳', color: chalk.yellow, text: 'waiting' },
    info: { icon: 'ℹ', color: chalk.blue, text: 'info' },
    warning: { icon: '⚠', color: chalk.yellow, text: 'warning' },
    0: { icon: '✔', color: chalk.green, text: 'success' },  // 0 as success
  };

  // Function to write logs to file
  const writeToFile = (logMessage) => {
    if (file) {
      fs.appendFile(file, logMessage + '\n', (err) => {
        if (err) console.error('Error writing to file', err);
      });
    }
  };

  // Helper to log status
  const consoleLog = (status, ...args) => {
    const statusDetails = statusMap[status];
    const formattedMessage = args.map(formatMessagePart).join(' ');

    if (statusDetails) {
      // Choose between verbal or icon-based output
      const displayMessage = useVerbal
        ? `${statusDetails.text.toUpperCase()}: ${formattedMessage}`
        : `${statusDetails.icon} ${formattedMessage}`;

      statusDetails.color(displayMessage);

      // Write to file if file logging is enabled
      writeToFile(displayMessage);

      // If writethrough is enabled, also print to console
      if (writethrough) {
        console.log(displayMessage);
      }
    }
  };

  // Handle writethrough and file logging conflicts
  if (file && writethrough) {
    consoleLog('warning', 'Logs are being redirected to file and writethrough is enabled.');
  }

  if (file && !writethrough) {
    consoleLog('warning', 'Logs are being redirected only to file.');
  } else if (!file && writethrough) {
    consoleLog('warning', 'writethrough is enabled but no file logging is set.');
  }

  // Return the logger methods for different statuses
  return {
    success: (...args) => consoleLog('success', ...args),
    error: (...args) => consoleLog('error', ...args),
    waiting: (...args) => consoleLog('waiting', ...args),
    info: (...args) => consoleLog('info', ...args),
    warning: (...args) => consoleLog('warning', ...args),
  };
};

export default createLogger;

