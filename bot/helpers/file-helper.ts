import fs from 'fs';
import path from 'path';


export const getAllFiles = (dirPath: string, arrayOfFiles: string[]) => {
    const items = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    items.forEach((item) => {
        if (fs.statSync(dirPath + "/" + item).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + item, arrayOfFiles)
        } else {
            arrayOfFiles.push(path.join(dirPath, "/", item))
        }
    });

    return arrayOfFiles;
};

export const getNextDirectories = (dirPath: string) => {
    const items = fs.readdirSync(dirPath);
    let directoryArray: string[] = [];
    items.forEach((item) => {
        if (fs.statSync(dirPath + "/" + item).isDirectory()) {
            directoryArray.push(item);
        }
    });
    return directoryArray;
};

export const getFilesFromDirectory = (dirPath: string) => {

    if (!fs.existsSync(dirPath)) return;

    const items = fs.readdirSync(dirPath);
    let fileArray: string[] = [];
    items.forEach((item) => {
        if (fs.statSync(dirPath + "/" + item).isFile()) {
            fileArray.push(item);
        }
    });
    return fileArray;
}

export const hasSeasonDirectory = (dirPath: string) => {
    
    if (!fs.existsSync(dirPath)) return false;

    const items = fs.readdirSync(dirPath);
    for(let item of items) {
        if (fs.statSync(dirPath + "/" + item).isFile()) {
            return true;
        }
    }

    return false;
}