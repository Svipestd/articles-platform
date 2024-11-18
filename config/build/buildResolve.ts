import webpack from "webpack";
import { BuildOptions } from "./types/config";

export function buildResolve(options: BuildOptions): webpack.ResolveOptions {
  const { paths } = options

  return {
    extensions: ['.tsx', '.ts', '.js'], // Импорт без добавления расширения
    preferAbsolute: true,
    modules: [paths.src, 'node_modules'],
    mainFiles: ['index'],
    alias: {
      '@': paths.src
    }
  }
}