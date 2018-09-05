import * as path from 'path';
import * as yargs from 'yargs';
import { spawnSync } from 'child_process';
import * as rimraf from 'rimraf';
import { promisify } from 'util';
import * as dotenv from 'dotenv';

const environments: string[] = ['dev', 'stg'];

const rm = promisify(rimraf);

function getParams(args: any) {
  const params: any = {
    file: {
      arg: '-F or --file',
      value: args.F || args.file,
      optional: true,
    },
    folder: {
      arg: '-P or --path',
      value: args.P || args.path,
      optional: true,
    },
    test: {
      arg: '-T or --test',
      value: args.T || args.test,
      optional: true,
    },
    env: {
      arg: '-E or --env',
      value: args.E || args.env || 'stg',
    },
    report: {
      arg: '-R or --report',
      value: args.hasOwnProperty('R') || args.hasOwnProperty('report'),
      optional: true,
    },
  };

  if (!environments.includes(params.env.value)) {
    throw new Error(
      `Environment passed is not valid. Enviroment must be one of the following ${environments}`,
    );
  }

  if (params.file.value && !params.folder.value) {
    throw new Error(`The parameter 'file' depends on parameter 'folder'`);
  }

  Object.keys(params).forEach(item => {
    if (!params[item].optional && !params[item].value) {
      throw new Error(`The parameter '${params[item].arg}' is required`);
    }
  });

  return Object.keys(params)
    .map(key => ({ [key]: params[key].value }))
    .reduce((acc, param) => Object.assign(acc, param), {});
}

(async args => {
  try {
    const { folder, file, test, env, report } = getParams(args);

    const pathFolder = folder || 'suite';

    const watchTests = file
      ? path.join('out', 'test', pathFolder, `${file}.test.js`)
      : path.join('out', 'test', pathFolder);

    const command = [
      '--opts',
      path.join('test', 'config', 'mocha.opts'),
      watchTests,
    ];

    if (report) {
      command.push(
        '--reporter mochawesome',
        '--reporter-options timestamp=true,reportDir=test-results/reports,reportFilename=tests',
      );
    }

    if (test) {
      command.push('-g', test);
    }

    dotenv.config({ path: `test/config/environments/${env}.env` });

    console.log('\x1b[33m', `Running tests on '${env}' environment`);

    spawnSync('mocha', command, { stdio: 'inherit', shell: true });
  } catch (err) {
    console.error(err.message);
  } finally {
    await rm('out');
  }
})(yargs.argv);
