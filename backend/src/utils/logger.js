import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logsDir = path.join(__dirname, '../../logs');

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const getTimestamp = () => {
  return new Date().toISOString();
};

const logger = {
  info: (message) => {
    const log = `[${getTimestamp()}] ℹ️ INFO: ${message}`;
    console.log(log);
    fs.appendFileSync(path.join(logsDir, 'app.log'), log + '\n');
  },

  error: (message, error = '') => {
    const log = `[${getTimestamp()}] ❌ ERROR: ${message} ${error?.message || ''}`;
    console.error(log);
    fs.appendFileSync(path.join(logsDir, 'error.log'), log + '\n');
  },

  warn: (message) => {
    const log = `[${getTimestamp()}] ⚠️ WARN: ${message}`;
    console.warn(log);
    fs.appendFileSync(path.join(logsDir, 'app.log'), log + '\n');
  },

  debug: (message) => {
    if (process.env.NODE_ENV === 'development') {
      const log = `[${getTimestamp()}] 🐛 DEBUG: ${message}`;
      console.log(log);
    }
  }
};

export default logger;
