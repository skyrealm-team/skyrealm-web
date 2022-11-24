declare module '*.scss' {
  const content: { [key: string]: any };
  export = content;
}

declare module '*.png' {
  const src: string;
  export = src;
}
