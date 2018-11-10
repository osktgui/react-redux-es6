/*eslint-disable no-console*/
import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod';
import colors from 'colors';

process.env.NODE_ENV = 'production';

console.log('Generation minified bundle from production via webpack. This will take a moment...'.blue);

webpack(webpackConfig).run((err, stats) => {

  if (err) {
    console.log(err.bold.red);
    return 1;
  }

  const jsonStats = stats.toJson();

  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(error => console.log(error.red));
  }

  if (jsonStats.hasWarnings) {
    console.log('webpack generated the following warnings: '.bold.yellow);
    jsonStats.warnings.map(warning => console.log(warning.yellow));
  }

  console.log('Webpack stats: ' + stats);

  //if we got this far, the build succeeded.
  console.log('Your app has been compiled in production mode an written to /dist. Its ready to roll!'.green);

  return 0;
});
