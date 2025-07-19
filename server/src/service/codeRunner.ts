
import { getDockerCommand, saveCodeAndInput } from '../utils/saveFile';
import { execDocker } from '../utils/dockerRunner';


export const runCode = async ({ language, code, input = "" } : { language: string, code: string, input?: string }) => {
    const { dir, fileName } = await saveCodeAndInput({ language, code, input });
    const dockerCmd = getDockerCommand({ language, fileName, dir });
    return await execDocker({ command: dockerCmd, dir });
};