import * as path from "path";
import {promises as fs, readdir} from "fs";




const getFiles = async (dirname : string, onlyDir : boolean = false) =>
{
    const directory = path.join(__dirname, "..", dirname);

    const directoryFiles = await fs.readdir(directory, {withFileTypes: true});

    const files : any[] = [];


    for(const file of directoryFiles)
    {
        const filePath = path.join(directory, file.name)
        

        if(file.isDirectory() && onlyDir)
        {
            files.push(file.name);
        }
        else {
            files.push(filePath)
        }
    }

    return files;
}




export default getFiles;