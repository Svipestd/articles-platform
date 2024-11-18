import webpack from 'webpack';
import { BuildOptions } from './types/config';
import { buildCssLoaders } from './loaders/buildCssLoaders';
import { buildSvgLoaders } from './loaders/buildSvgLoaders';

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
  const tsLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  };

  const assetLoader = {
    test: /\.(png|jpg|jpeg|gif|ico)$/i,
    type: 'asset/resource',
  };

  const fontLoader = {
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    type: 'asset/resource',
  };

  const cssLoaders = buildCssLoaders(true);
  const svgLoaders = buildSvgLoaders();

  return [assetLoader, fontLoader, ...svgLoaders, ...cssLoaders, tsLoader];
}
