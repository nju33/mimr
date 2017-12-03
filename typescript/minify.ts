import * as fs from 'fs-extra';
import * as path from 'path';
import {groupBy, flatten} from 'lodash';
import * as pGlob from 'glob-promise';
// @ts-ignore
import * as relative from 'relative';
import * as imagemin from 'imagemin';
import mozjpeg = require('imagemin-mozjpeg');
import pngcrush = require('imagemin-pngcrush');
import pngquant = require('imagemin-pngquant');
import gifsicle = require('imagemin-gifsicle');
import svgo = require('imagemin-svgo');
import webp = require('imagemin-webp');

export interface Data {
  filename: string;
  beforeLength: number;
  afterLength: number;
}

const getData = async (dirname: string, pattern: string): Promise<Data[]> => {
  const files = await pGlob(pattern);

  return Promise.all(
    files.map(async name => {
      const content = await fs.readFile(name);
      const beforeLength = Buffer.byteLength(content);

      return {
        filename: relative(dirname, name),
        beforeLength,
        afterLength: 0,
      };
    }),
  );
};

export const minify = {
  async jpg(dirname: string, toWebp: boolean = false): Promise<Data[]> {
    const pattern = path.join(dirname, '**/*.jp?(e)g');
    const data = await getData(dirname, pattern);

    const grouped = groupBy(data, item => {
      return path.dirname(item.filename);
    });

    const results = await Promise.all(
      Object.entries(
        grouped,
      ).map(async ([relativePath, groupData]: [string, Data[]]) => {
        const resultFiles = await imagemin(
          [path.join(dirname, relativePath, '*.jp?(e)g')],
          path.join(dirname, relativePath),
          {
            plugins: [toWebp ? webp() : mozjpeg()],
          },
        );

        resultFiles.forEach((file, idx) => {
          groupData[idx].afterLength = Buffer.byteLength(file.data);
        });

        return groupData;
      }),
    );

    return flatten(results);
  },
  async png(dirname: string, toWebp: boolean = false): Promise<Data[]> {
    const pattern = path.join(dirname, '**/*.png');
    const data = await getData(dirname, pattern);

    const grouped = groupBy(data, item => {
      return path.dirname(item.filename);
    });

    const results = await Promise.all(
      Object.entries(
        grouped,
      ).map(async ([relativePath, groupData]: [string, Data[]]) => {
        const resultFiles = await imagemin(
          [path.join(dirname, relativePath, '*.png')],
          path.join(dirname, relativePath),
          {
            plugins: [pngcrush(), toWebp ? webp() : pngquant()],
          },
        );

        resultFiles.forEach((file, idx) => {
          groupData[idx].afterLength = Buffer.byteLength(file.data);
        });

        return groupData;
      }),
    );

    return flatten(results);
  },
  async gif(dirname: string): Promise<Data[]> {
    const pattern = path.join(dirname, '**/*.gif');
    const data = await getData(dirname, pattern);

    const grouped = groupBy(data, item => {
      return path.dirname(item.filename);
    });

    const results = await Promise.all(
      Object.entries(
        grouped,
      ).map(async ([relativePath, groupData]: [string, Data[]]) => {
        const resultFiles = await imagemin(
          [path.join(dirname, relativePath, '*.gif')],
          path.join(dirname, relativePath),
          {
            plugins: [gifsicle()],
          },
        );

        resultFiles.forEach((file, idx) => {
          groupData[idx].afterLength = Buffer.byteLength(file.data);
        });

        return groupData;
      }),
    );

    return flatten(results);
  },
  async svg(dirname: string): Promise<Data[]> {
    const pattern = path.join(dirname, '**/*.svg');
    const data = await getData(dirname, pattern);

    const grouped = groupBy(data, item => {
      return path.dirname(item.filename);
    });

    const results = await Promise.all(
      Object.entries(
        grouped,
      ).map(async ([relativePath, groupData]: [string, Data[]]) => {
        const resultFiles = await imagemin(
          [path.join(dirname, relativePath, '*.svg')],
          path.join(dirname, relativePath),
          {
            plugins: [svgo()],
          },
        );

        resultFiles.forEach((file, idx) => {
          groupData[idx].afterLength = Buffer.byteLength(file.data);
        });

        return groupData;
      }),
    );

    return flatten(results);
  },
};
