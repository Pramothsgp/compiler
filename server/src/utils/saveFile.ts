

import fs from 'fs-extra';
import path from 'path';
import { v4 as randomUUID } from 'uuid';

export const saveCodeAndInput = async ( {language, code, input = ""} : {language: string, code: string, input?: string})  : Promise<{ dir: string; fileName: string }> => {
    const id = randomUUID();
    const dir = path.join(__dirname, '..', 'temp', id);

    await fs.ensureDir(dir);

    let fileName;
    switch (language) {
        case 'cpp': fileName = 'main.cpp'; break;
        case 'python': fileName = 'main.py'; break;
        case 'java': fileName = 'Main.java'; break;
        case 'javascript': fileName = 'main.js'; break;
        default: throw new Error('Unsupported language');
    }

    await fs.writeFile(path.join(dir, fileName), code);
    await fs.writeFile(path.join(dir, 'input.txt'), input || '');

    return { dir, fileName };
};


export const getDockerCommand = ({language, fileName, dir }: {language: string, fileName: string, dir: string}) : string => {
    let image, compileCmd = '', runCmd;

    switch (language) {
        case 'cpp':
            image = 'gcc';
            compileCmd = `g++ ${fileName} -o main`;
            runCmd = './main';
            break;
        case 'python':
            image = 'python:3';
            runCmd = `python3 ${fileName}`;
            break;
        case 'java':
            image = 'openjdk';
            compileCmd = `javac ${fileName}`;
            runCmd = `java Main`;
            break;
        case 'javascript':
            image = 'node';
            runCmd = `node ${fileName}`;
            break;
        default:
            throw new Error('Unsupported language');
    }

    const compileAndRunCmd = compileCmd ? `${compileCmd} && ${runCmd} < input.txt` : `${runCmd} < input.txt`;

    return `docker run --rm -m 100m --network none -v ${dir}:/app -w /app ${image} sh -c "${compileAndRunCmd}"`;
};
