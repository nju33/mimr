declare namespace Imagemin {
  export interface Options {
    plugins: any[];
  }

  export interface File {
    data: Buffer;
    path: string;
  }

  // tslint:disable-next-line no-shadowed-variable
  export type Imagemin = (
    pattern: string[],
    distdir: string,
    options: Options,
  ) => Promise<File[]>;
}

declare module 'imagemin' {
  const imagemin: Imagemin.Imagemin;
  export = imagemin;
}
