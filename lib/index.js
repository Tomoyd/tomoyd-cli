import arg from "arg";
import createProject from "./createProject";

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      "--git": Boolean,
      "--yes": Boolean,
      "--install": Boolean,
      "-g": "--git",
      "-y": "--yes",
      "-i": "--install"
    },
    {
      argv: rawArgs.slice(2)
    }
  );
  return {
    skipPrompts: args["--yes"] || false,
    git: args["--git"] || false,
    template: args._[0] || "JavaScript"
  };
}

async function promptForMissingOption(options) {
  return options;
}

export async function cli(argv) {
  let options = parseArgumentsIntoOptions(argv);
  options = await promptForMissingOption(options);
  await createProject(options);
}
