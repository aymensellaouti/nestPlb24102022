import { devConfig } from "../config/dev.config";
import { preprodConfig } from "../config/preprod.config";

const configs = {
  'dev': devConfig,
  'preprod': preprodConfig
}

export const getConfig = () => {
  console.log(configs[process.env.NODE_ENV ?? 'dev']);
  return configs[process.env.NODE_ENV ?? 'dev'];
}
