import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export function buildCssLoaders(isDev: boolean) {
  const cssRegularLoader = {
    test: /\.(scss|css)$/,
    exclude: /\.module\.(scss|css)$/,
    use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
  };

  const cssModuleLoader = {
    test: /\.module\.(scss|css)$/,
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          modules: {
            namedExport: false,
            exportLocalsConvention: 'as-is',
          },
        },
      },
      'sass-loader',
    ],
  };

  return [cssRegularLoader, cssModuleLoader];
}
