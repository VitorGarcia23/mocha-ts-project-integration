import { spawn } from 'child_process';

let file = '*';
let folder = 'suite/**';

process.argv.forEach(arg => {
    if (arg.includes('--file=')) {
        file = arg.replace('--file=', '');
    }
    if (arg.includes('--folder=')) {
        folder = arg.replace('--folder=', '');
    }
});

const args = ['--opts', 'test/config/mocha.opts', `test/${folder}/${file}.test.ts`];

spawn('mocha', args, { stdio: 'inherit', shell: true });
