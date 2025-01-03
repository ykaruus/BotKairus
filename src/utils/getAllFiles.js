const fs = require("fs").promises;
const path = require("path");

module.exports = async (diretorio, foldersOnly = false) => {
    try {
        const fileNames = []
        const files = await fs.readdir(diretorio, {withFileTypes:true});
        for(const file of files)
        {
            
            const filePath = path.join(diretorio, file.name)

            if(foldersOnly)
            {
                if(file.isDirectory())
                {
                    fileNames.push(file.name);
                }
            } else{
                if(file.isFile())
                {
                    fileNames.push(filePath)
                }
            }
        }


        return fileNames;
    } catch(error)
    {
        console.error("Exception ocurred at getAllFiles : " + error)
        throw error;
    }
}