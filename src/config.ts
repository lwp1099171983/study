import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

export default async () => {
  const configFilePath = join(join(process.cwd(), 'src'), 'env.yaml');
  const config = readFileSync(configFilePath, 'utf8');
  return yaml.load(config) as Record<string, any>;
};
