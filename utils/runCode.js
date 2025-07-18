const fs = require('fs-extra');
const { exec } = require('child_process');
const { v4: uuid } = require('uuid');
const path = require('path');

const runCode = async (language, code, input = "") => {
    const id = uuid();
    const dir = path.join(__dirname, '..', 'temp', id);
    await fs.ensureDir(dir);

    let fileName, image, compileCmd = '', runCmd;

    switch (language) {
        case 'cpp':
            fileName = 'main.cpp';
            image = 'gcc';
            compileCmd = `g++ ${fileName} -o main`;
            runCmd = './main';
            break;
        case 'python':
            fileName = 'main.py';
            image = 'python:3';
            runCmd = `python3 ${fileName}`;
            break;
        case 'java':
            fileName = 'Main.java';
            image = 'openjdk';
            compileCmd = `javac ${fileName}`;
            runCmd = `java Main`;
            break;
        case 'javascript':
            fileName = 'main.js';
            image = 'node';
            runCmd = `node ${fileName}`;
            break;
        default:
            throw new Error('Unsupported language');
    }

    const codePath = path.join(dir, fileName);
    await fs.writeFile(codePath, code);
    await fs.writeFile(path.join(dir, 'input.txt'), input || '');

    const compileAndRunCmd = compileCmd ? `${compileCmd} && ${runCmd} < input.txt` : `${runCmd} < input.txt`;

    const dockerCmd = `docker run --rm -m 100m --network none -v ${dir}:/app -w /app ${image} sh -c "${compileAndRunCmd}"`;

    console.log('Executing Docker command:', dockerCmd); // 🔍 debug

    return new Promise((resolve, reject) => {
        exec(dockerCmd, { timeout: 10000 }, (err, stdout, stderr) => {
            fs.remove(dir); // cleanup
            if (err) {
                console.error('Docker execution error:', stderr || err.message); // 🔍 debug
                return reject(new Error(stderr || err.message));
            }
            resolve({ stdout, stderr });
        });
    });
};

const test = () => {
    console.log('Testing Docker connection...');
    return new Promise((resolve, reject) => {
        const dockerCmd = `docker run hello-world`;
        exec(dockerCmd, { timeout: 5000 }, (err, stdout, stderr) => {
            if (err) {
                console.error('Docker test failed:', stderr || err.message);
                return reject(new Error(stderr || err.message));
            }
            resolve({ stdout, stderr });
        });
    });
};

module.exports = { runCode, test };
