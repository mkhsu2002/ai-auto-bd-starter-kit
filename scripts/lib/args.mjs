import { isAbsolute, resolve } from "node:path";

export function resolveCliPaths(argv = process.argv.slice(2), cwd = process.cwd(), env = process.env) {
  const options = parseArgs(argv);

  return {
    configPath: resolvePath(options.config ?? env.PROJECT_CONFIG, cwd),
    leadsPath: resolvePath(options.leads ?? env.LEADS_CSV, cwd)
  };
}

function parseArgs(argv) {
  const options = {};

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "--config" || arg === "-c") {
      options.config = readOptionValue(argv, index, arg);
      index += 1;
    } else if (arg.startsWith("--config=")) {
      options.config = arg.slice("--config=".length);
    } else if (arg === "--leads" || arg === "-l") {
      options.leads = readOptionValue(argv, index, arg);
      index += 1;
    } else if (arg.startsWith("--leads=")) {
      options.leads = arg.slice("--leads=".length);
    } else if (arg === "--help" || arg === "-h") {
      options.help = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return options;
}

function readOptionValue(argv, index, flag) {
  const value = argv[index + 1];
  if (!value || value.startsWith("-")) {
    throw new Error(`Missing value for ${flag}`);
  }
  return value;
}

function resolvePath(value, cwd) {
  if (!value) return undefined;
  return isAbsolute(value) ? value : resolve(cwd, value);
}
