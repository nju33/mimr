import * as yargs from 'yargs';
import * as chalk from 'chalk';
import * as Listr from 'listr';
import Table = require('easy-table');
import * as filesize from 'filesize';
import {Data, minify} from './minify';

const commands = ['img', 'jpg', 'png', 'gif', 'svg'];

const log = (data: Data[]) => {
  const t = new Table();
  let beforeSum = 0;
  let afterSum = 0;

  for (const item of data) {
    let wrap: (str: string) => string = s => s;
    if (item.beforeLength !== item.afterLength) {
      wrap = chalk.yellow.bold;
    }
    t.cell(chalk.bold('Filename'), wrap(item.filename));
    t.cell(chalk.bold('Size «B»'), wrap(filesize(item.beforeLength)));
    t.cell(chalk.bold('Size «A»'), wrap(filesize(item.afterLength)));
    t.newRow();

    beforeSum += item.beforeLength;
    afterSum += item.afterLength;
  }

  (() => {
    let wrap: (str: string) => string = s => s;
    if (beforeSum !== afterSum) {
      wrap = chalk.yellow.bold;
    }

    t.total(chalk.bold('Size «B»'), {
      printer: () => wrap(filesize(beforeSum)),
    });
    t.total(chalk.bold('Size «A»'), {
      printer: () => wrap(filesize(afterSum)),
    });
  })();
  console.log(t.toString());
};

(async () => {
  // tslint:disable-next-line no-unused
  const args = yargs
    .command(
      'img',
      'Minify *.jpg, *.png, *.gif and *.svg',
      command => {
        return command.help();
      },
      async () => {
        let result: Data[] = [];
        const task = new Listr([
          {
            title: 'Minify',
            task: async () => {
              result = await Promise.all([
                ...(await minify.jpg(process.cwd())),
                ...(await minify.png(process.cwd())),
                ...(await minify.gif(process.cwd())),
                ...(await minify.svg(process.cwd())),
              ]);
            },
          },
        ]);

        await task.run();

        console.log();
        log(result);
      },
    )
    .command(
      'jpg',
      'Minify *.jpg',
      command => {
        return command
          .option('webp', {
            alias: 'w',
            type: 'boolean',
            default: false,
          })
          .help();
      },
      async () => {
        let result: Data[] = [];
        const task = new Listr([
          {
            title: 'Minify',
            task: async () => {
              result = await minify.jpg(process.cwd(), args.webp);
            },
          },
        ]);

        await task.run();

        console.log();
        log(result);
      },
    )
    .command(
      'png',
      'Minify *.png',
      command => {
        return command
          .option('webp', {
            alias: 'w',
            type: 'boolean',
            default: false,
          })
          .help();
      },
      async () => {
        let result: Data[] = [];
        const task = new Listr([
          {
            title: 'Minify',
            task: async () => {
              result = await minify.png(process.cwd(), args.webp);
            },
          },
        ]);

        await task.run();

        console.log();
        log(result);
      },
    )
    .command(
      'gif',
      'Minify *.gif',
      command => {
        return command.help();
      },
      async () => {
        let result: Data[] = [];
        const task = new Listr([
          {
            title: 'Minify',
            task: async () => {
              result = await minify.gif(process.cwd());
            },
          },
        ]);

        await task.run();

        console.log();
        log(result);
      },
    )
    .command(
      'svg',
      'Minify *.svg',
      command => {
        return command.help();
      },
      async () => {
        let result: Data[] = [];
        const task = new Listr([
          {
            title: 'Minify',
            task: async () => {
              result = await minify.svg(process.cwd());
            },
          },
        ]);

        await task.run();

        console.log();
        log(result);
      },
    )
    .help().argv;

  if (!commands.includes(args._[0])) {
    yargs.showHelp();
  }
})();
