export type Relative = (from: string, to: string) => string;

// @ts-ignore
declare module 'relative' {
  const relative: Relative;
  export = relative;
}
