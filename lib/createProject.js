import chalk from "chalk";
import execa from "execa";
import fs from "fs";
import Listr from "listr";
import ncp from "ncp";
import path from "path";
import { projectInstall } from "pkg-install";
import { promisify } from "util";
const access = promisify(fs.access);
const copy = promisify(ncp);
const initGit = async (options) => {
  const result = await execa("git", ["init"], {
    cwd: options.targetDir
  });
  if (result.failed) {
    return Promise.reject(new Error("Failed to initialize git"));
  }
  return;
};
const copyTemplateFiles = (options) => {
  return copy(options.templateDir, options.targetDir);
};

const createProject = async (options) => {
  const targetDir = path.join(process.cwd(), "current-project");
  const templateDir = path.join(__dirname, "../template", "javascript");
  options.targetDir = targetDir;
  options.templateDir = templateDir;
  try {
    await access(templateDir, fs.constants.R_OK);
  } catch (err) {
    console.log(chalk.red("ERROR"), err);
  }
  const tasks = new Listr([
    {
      title: "copy project files",
      task: () => copyTemplateFiles(options)
    },
    {
      title: "git init",
      task: () => initGit(options)
    },
    {
      title: "Install dependencies",
      task: () =>
        projectInstall({
          cwd: options.targetDir
        })
    }
  ]);
  await tasks.run();
  console.log("Already", chalk.green.bold("DONE"));
  return true;
};

export default createProject;
