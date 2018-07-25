import { spawn } from 'child_process';

let file = '*';
let folder = 'suite/**';
let test;

process.argv.forEach(arg => {
    if (arg.includes('--file=')) {
        file = arg.replace('--file=', '');
    }
    if (arg.includes('--folder=')) {
        folder = arg.replace('--folder=', '');
    }
    if (arg.includes('--test=')) {
        test = arg.replace('--test=', '');
    }
});

const args = ['--opts', 'test/config/mocha.opts', `test/${folder}/${file}.test.ts`];

if (test) {
    args.push('-g');
    args.push(test);
}

spawn('mocha', args, { stdio: 'inherit', shell: true });
