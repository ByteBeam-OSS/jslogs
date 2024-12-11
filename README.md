# @bbl/jslogger

A simple and configurable logger for Node.js, allowing flexibility in output format and log destinations (console or file). Supports both icon-based and verbal status messages, with options for JSON output and more.

## Features

- **Customizable logging output**: Choose between **icon-based** or **verbal status** (e.g., "success", "error").
- **Console & file logging**: Log to both the console and a file, with the option to control the behavior with `writethrough` and `file` flags.
- **JSON output**: Enable structured JSON logging for easy integration with other systems.
- **Color support**: Full support for color-coded log levels (success, error, info, etc.) in the console.
- **Simple API**: Easy to use and configure, with minimal setup.

## Installation

To install the `@bbl/jslogger` package, run the following command:

```
npm install @bbl/jslogger
```

## Usage

### Basic Usage

```javascript
import createLogger from '@bbl/jslogger';

// Create a logger instance
const logger = await createLogger({
  jsonOutput: false,  // Set to true for JSON output
  file: './logs/output.log',  // Set to the desired file path to log to a file
  writethrough: true,  // Log to both file and console
  useVerbal: false,    // Set to true to use verbal status names instead of icons
});

// Log messages with different statuses
logger.success('Operation completed successfully');
logger.error('Something went wrong');
logger.info('Information message');
logger.warning('This is a warning');
logger.waiting('Please wait...');
```

### JSON Output Example

If `jsonOutput` is set to `true`, the logger will output logs as JSON, for example:

```json
{
  "status": "success",
  "message": "Operation completed successfully"
}
```

## Options

- `jsonOutput` (default: `false`): Set to `true` to enable JSON output.
- `file` (default: `null`): Provide a file path to log to a file.
- `writethrough` (default: `true`): Set to `true` to log both to the console and to the file.
- `useVerbal` (default: `false`): Set to `true` to use verbal descriptions instead of icons (e.g., `"success"` instead of `"✔"`).
