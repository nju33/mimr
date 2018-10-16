declare namespace GlobPromise {
  // tslint:disable-next-line no-shadowed-variable
  export type GlobPromise = (
    pattern: string,
    options?: any,
  ) => Promise<string[]>;
}

declare module 'glob-promise' {
  const glob: GlobPromise.GlobPromise;
  export = glob;
}
