import * as fs from 'fs-extra';
import * as path from 'path';
import {execFile} from 'child_process';
import {promisify} from 'util';

const pExecFile = promisify(execFile);
const tsNode = path.join(__dirname, '../node_modules/.bin/ts-node');
const tsconfig = path.join(__dirname, '../tsconfig.json');
const cli = path.join(__dirname, '../src/cli.ts');
const originalDir = path.join(__dirname, 'fixtures/original');
const tmpDir = path.join(__dirname, 'fixtures/tmp');

const original = async (str: TemplateStringsArray): Promise<number> => {
  const buf = await fs.readFile(path.join(originalDir, str[0]));

  return Buffer.byteLength(buf);
};
const tmp = async (str: TemplateStringsArray): Promise<number> => {
  const buf = await fs.readFile(path.join(tmpDir, str[0]));

  return Buffer.byteLength(buf);
};

describe('min', () => {
  beforeEach(async () => {
    await fs.ensureDir(tmpDir);
    await fs.copy(originalDir, tmpDir);
  });

  afterEach(async () => {
    await fs.remove(tmpDir);
  });

  test('img', async () => {
    await pExecFile('bash', [
      '-c',
      `cd ${tmpDir} && ${tsNode} -P ${tsconfig} ${cli} img`,
    ]);

    await expect(
      (async () => {
        const originalSize = await original`npm.jpg`;
        const tmpSize = await tmp`npm.jpg`;

        return originalSize === tmpSize;
      })(),
    ).resolves.toEqual(false);

    await expect(
      (async () => {
        const originalSize = await original`npm.png`;
        const tmpSize = await tmp`npm.png`;

        return originalSize === tmpSize;
      })(),
    ).resolves.toEqual(false);

    await expect(
      (async () => {
        const originalSize = await original`cat.gif`;
        const tmpSize = await tmp`cat.gif`;

        return originalSize === tmpSize;
      })(),
    ).resolves.toEqual(false);

    await expect(
      (async () => {
        const originalSize = await original`npm.svg`;
        const tmpSize = await tmp`npm.svg`;

        return originalSize === tmpSize;
      })(),
    ).resolves.toEqual(false);
  });
});
