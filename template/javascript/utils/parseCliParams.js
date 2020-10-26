const arg = require('arg');

function parseCliParams(argvParams) {
  const args = arg(
    {
      '--dev': Boolean,
      '--prod': Boolean,
      '-d': '--dev',
      '-p': '--prod',
    },
    {
      argv: argvParams.slice(2),
    },
  );

  return {
    dev: args['--dev'] || false,
    prod: args['--prod'] || false,
    skipTemplate: args._[0] !== 'template',
    template: args._[0] === 'template',
  };
}

module.exports = parseCliParams;
