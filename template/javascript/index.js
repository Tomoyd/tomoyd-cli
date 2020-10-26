const webpack = require('webpack');
const parseCliParams = require('./utils/parseCliParams');
const devConfig = require('./build/webpack.dev.conf');
const prodConfig = require('./build/webpack.pro.conf');

const WebpackDevServer = require('webpack-dev-server');
const promptForOptions = require('./utils/promptForOptions');
const { mode } = require('./build/webpack.dev.conf');

function excWebpack(options) {
  const currentConfig = (options.prod ? prodConfig : devConfig) || {};
  const compiler = webpack({
    mode: options.prod ? 'production' : 'development',
    ...currentConfig,
  });
  if (options.prod) {
    compiler.run((err, stats) => {
      console.log(
        err,
        { statsErr: stats.hasErrors() },
        stats.toString({ colors: true }),
      );
    });
  } else {
    const devServerOptions = Object.assign({}, devConfig.devServer, {
      open: true,
      stats: {
        colors: true,
      },
    });
    const server = new WebpackDevServer(compiler, devServerOptions);

    server.listen(devServerOptions.port, '127.0.0.1', () => {});
  }
}

async function cli(argv) {
  const argvParam = parseCliParams(argv);
  const options = await promptForOptions(argvParam);
  excWebpack(options);
}

module.exports = cli;
