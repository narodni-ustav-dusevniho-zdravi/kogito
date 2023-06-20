import {execSync, spawnSync} from 'child_process';
import * as fs from 'fs-extra';
import os from 'os';
import * as path from 'path';

export const logger = {
  warn: (...args: unknown[]) => console.warn('\x1b[33m%s\x1b[0m', ...args),
  error: (...args: unknown[]) => console.warn('\x1b[41m%s\x1b[0m', ...args),
  log: console.log,
};

export const readJson = <T>(filePath: string): T =>
  JSON.parse(fs.readFileSync(filePath).toString()) as T;

export const runTerminal = (command: string) => {
  logger.log(command);
  execSync(command);
};

export const isCmd = () => {
  if (os.platform() !== 'win32') {
    return false;
  }

  try {
    const result = spawnSync(`ls`, {
      stdio: 'pipe',
    });

    return result.error !== undefined;
  } catch (err) {
    return true;
  }
};

export const copyByRegex = (dir: string, regex: RegExp, toDir: string) => {
  fs.readdirSync(dir)
    .filter(f => regex.test(f))
    .forEach(f => fs.copySync(path.join(dir, f), path.join(toDir, f)));
};
