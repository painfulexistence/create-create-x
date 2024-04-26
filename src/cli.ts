#!/usr/bin/env node

import chalk from "chalk";
import { resolve } from "node:path";
import { type AfterHookOptions, create } from ".";

const templateRoot = resolve(__dirname, "..", "templates");

const caveat = ({ answers: { name, template } }: AfterHookOptions) => {
  let text = `
cd ${chalk.bold.green(name)}
`;

  switch (template) {
    case "typescript":
      text += `
Inside the directory, you can run several commands:

${chalk.bold.cyan("npm run dev")}
  ${chalk.gray("Starts 'tsc -w'.")}
${chalk.bold.cyan("npm run build")}
  ${chalk.gray("Build the app for production.")}

After the build, run ${chalk.cyan("node dist/cli.js <name>")} to test your app.
`;
      break;
    default:
      text += `node src/cli.js <name>
`;
  }

  text += `
Read the docs for the further information:
${chalk.yellow(
  "https://github.com/painfulexistence/create-create-x/blob/main/README.md"
)}`;

  return text;
};

create("create-create-x", {
  templateRoot,
  promptForTemplate: true,
  skipNpmInstall: true,

  modifyName: (name) => (name.startsWith("create-") ? name : `create-${name}`),

  after: async ({ installNpmPackage }: AfterHookOptions) => {
    console.log("\nInstalling the latest version of create-create-x");
    await installNpmPackage("create-create-x");
  },

  caveat,
});
