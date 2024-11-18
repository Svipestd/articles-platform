declare module '*.scss' {
  const classes: { [key: string]: string };
  export = classes;
}

declare module "*.jpg";
declare module "*.jpeg";
declare module "*.png";

declare module "*.svg" {
  import React from "react";
  const SVG: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}

declare const __IS_DEV__: boolean;