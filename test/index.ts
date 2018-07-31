import * as path from 'path';
import * as yargs from 'yargs';
import { spawnSync, execSync } from 'child_process';

const environments: string[] = ['dev', 'stg', 'prd'];

function getParams(args: any) {
    const params: any = {
        file: {
            arg: '-F or --file',
            value: args.F || args.file || '*'
        },
        folder: {
            arg: '-P or --path',
            value: args.P || args.path || 'suite/**'
        },
        test: {
            arg: '-T or --Test',
            value: args.T || args.test,
            optional: true,
        },
        env: {
            arg: '-E or --env',
            value: args.E || args.env || 'dev',
            optional: true,
        }
    };

    if (!environments.includes(params.env.value)) {
        throw new Error(`Environment passed is not valid. Enviroment must be one of the following ${environments}`)
    }

    Object.keys(params).forEach(item => {
        if (!params[item].optional && !params[item].value) {
            throw new Error(`The parameter "${params[item].arg}" is required`);
        }
    });

    return Object.keys(params)
        .map(key => ({ [key]: params[key].value }))
        .reduce((acc, param) => Object.assign(acc, param), {});
}

(args => {
    try {
        const { folder, file, test, env } = getParams(args);

        const command = [
            '--opts',
            path.join('test', 'config', 'mocha.opts'),
            path.join('out', 'test', folder, `${file}.test.js`)
        ];

        if (test) {
            command.push('-g', test);
        }

        if (env) {
            process.env['AppEnvironment'] = env;
        }

        spawnSync('mocha', command, { stdio: 'inherit', shell: true });
    } catch (err) {
        console.error(err.message);
    } finally {
        execSync('rm -r out', { stdio: 'inherit' });
    }
})(yargs.argv)
