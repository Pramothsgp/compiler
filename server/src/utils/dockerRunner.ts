import { exec } from "child_process";
import  fs  from "fs-extra";


/**
 * Executes a docker command and returns stdout and stderr
 */
export const execDocker = ({command , dir} : {command: string, dir: string}) : Promise<{ stdout: string; stderr: string }> => {
    return new Promise((resolve, reject) => {
        exec(command, { timeout: 10000 }, async (err, stdout, stderr) => {
            await fs.remove(dir); // cleanup temp directory
            if (err) {
                console.error('Docker execution error:', stderr || err.message);
                return reject(new Error(stderr || err.message));
            }
            resolve({ stdout, stderr });
        });
    });
};