#!/usr/bin/env node
const chalk = require("chalk");
const clear = require("clear");
const inquirer = require("./lib/inquirer");
const logSymbols = require("log-symbols");
const ora = require("ora");
const auth = require("./lib/auth");
const ui = require("./lib/ui");
const { yellow } = require("chalk");

clear();

ui.title();
const run = async () => {
  const token = auth.checkTokenExists();

  let signedIn = false;
  if (token) {
    console.log(chalk.grey(`Authentication token found`));
    let spinner = ora({
      text: `${chalk.green("validating token..")}`,
      prefixText: logSymbols.info
    }).start();

    const validate = await auth.validateToken(token);
    spinner.stop();
    if (validate) {
      signedIn = true;
    } else {
      console.log(
        `\n${chalk.red("Could not validate token.Please sign in again")}`
      );
    }
  }
  while (!signedIn) {
    const credentials = await inquirer.askSignInCredentials();
    spinner = ora({
      text: `${chalk.green("Authenticating ...")}`,
      color: "yellow"
    }).start();
    const signIn = await auth.handleSign(credentials);
    spinner.stop();
    if (signIn.success) {
      console.log(`\n${chalk.green("Successfully authenticated")}`);
      signedIn = true;
      auth.storeToken("token");
    } else {
      console.log(chalk.red("\nIncorrect credentials.Please try again"));
    }
  }
  clear();
  ui.title();
  while (signedIn) {
    console.log("\n");
    console.log("\n");
    const { option } = await inquirer.mainOptions();

    // clean up UI
    clear();
    ui.title();

    switch (option) {
      case "Exit":
        process.exit();

      case "Sign Out and Exit":
        auth.clearAuthToken();
        process.exit();

      default:
        console.log(chalk.grey("Option not yet implemented"));
    }
  }
};

run();
