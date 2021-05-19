import { exec } from "child_process"

export const sleep = (milliSeconds : number) => new Promise(resolve => setTimeout(resolve, milliSeconds))

export const execAsync = (command : string) => new Promise<string>((resolve, reject) =>
{
    exec(command, (error, stdout, stderr) =>
    {
        if (error || stderr)
            reject(error ? error : stderr)
        
        resolve(stdout)
    })
})