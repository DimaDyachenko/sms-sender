import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { registerAs } from '@nestjs/config';
import yaml from 'js-yaml';

export const twilio = registerAs('twilio', () => {
  const envConfigs = yaml.load(
    readFileSync(
      join(
        dirname(fileURLToPath(import.meta.url)),
        `../../config/${getVariable('APP_ENV')}.yml`,
      ),
      'utf8',
    ),
  );

  return envConfigs;
});

export function getVariable(name) {
  return process.env[name];
}
