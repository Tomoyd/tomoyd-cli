const inquirer = require('inquirer');
const { options } = require('less');

async function promptForOptions(params) {
  // type: 'list',
  // name: 'template',
  // message: 'Please choose which project template to use',
  // choices: ['JavaScript', 'TypeScript'],
  // default: defaultTemplate,

  const defaultTemplate = 'JavaScript';
  const listOpts = [];
  if (params.skipTemplate) {
    return {
      ...params,
      template: defaultTemplate,
    };
  }
  listOpts.push({
    type: 'list',
    name: 'template',
    message: '选择一个模板',
    choices: ['JavaScript', 'TypeScript'],
    default: defaultTemplate,
  });

  const answers = await inquirer.prompt(listOpts);

  return {
    ...options,
    template: answers.template,
  };
}

module.exports = promptForOptions;
