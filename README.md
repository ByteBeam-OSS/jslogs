# @bytebeam/jslogs

A simple and configurable logger for Node.js, allowing flexibility in output format and log destinations (console or file). Supports both icon-based and verbal status messages, with options for JSON output and more.

## Features

- **Customizable logging output**: Choose between **icon-based** or **verbal status** (e.g., "success", "error").
- **Console & file logging**: Log to both the console and a file, with the option to control the behavior with `writethrough` and `file` flags.
- **JSON output**: Enable structured JSON logging for easy integration with other systems.
- **Color support**: Full support for color-coded log levels (success, error, info, etc.) in the console.
- **Simple API**: Easy to use and configure, with minimal setup.

## Installation

To install the `@bytebeam/jslogs` package, run the following command:

```
npm install @bytebeam/jslogs
```

## Usage

### Basic Usage

```javascript
import createLogger from '@bytebeam/jslogs';

// Create a logger instance
const logger = await createLogger({
  jsonOutput: false,  // Set to true for JSON output
  file: './logs/output.log',  // Set to the desired file path to log to a file
  writethrough: true, // Set to true to log to both console and file
});

// Example log messages
logger.success('This is a success message');
logger.error('This is an error message');
logger.warning('This is a warning message');
logger.info('This is an info message');
logger.waiting('This is a waiting message');

// Enable JSON output
const jsonLogger = await createLogger({ jsonOutput: true });
jsonLogger.success({ data: 'This is a JSON formatted success message' });
```

### Options

You can customize the logger with the following options:

- **jsonOutput**: (boolean) If true, logs will be formatted as JSON.
- **file**: (string) Path to a file where logs will be written. If not provided, logs will only be printed to the console.
- **writethrough**: (boolean) If true, logs will be printed to both the console and the file (if `file` is specified). If false, logs will only be written to the file.
- **useVerbal**: (boolean) If true, logs will use verbal descriptions ("success", "error") instead of icons.
