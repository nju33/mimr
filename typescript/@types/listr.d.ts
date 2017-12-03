declare namespace Listr {
  export interface Task {
    title: string;
    task(): Listr | Promise<any>;
  }

  // tslint:disable-next-line no-shadowed-variable
  export class Listr {
    constructor(tasks: Task[]);
    run(): Promise<any>;
  }
}

declare module 'listr' {
  const listr: typeof Listr.Listr;
  export = listr;
}
