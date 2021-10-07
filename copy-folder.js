import fs from 'fs';
import dotenv from 'dotenv';
import { logger } from './logger.js';


dotenv.config()

export const copyFolderRecursiveSync = (source, target) => {
    if (!fs.existsSync(source)) {
        throw 'there is no source folder'
    }
    if (!fs.existsSync(target)) {  // there is no source folder'
        fs.mkdirSync(target);
    }
    var files = [];


    // Copy

    if (fs.lstatSync(source).isDirectory()) {
        files = fs.readdirSync(source);
        files.forEach(function (file) {
            var targetFolder = target + '/' + file;
            var curSource = source + '/' + file;

            if (fs.lstatSync(curSource).isDirectory()) {
                fs.mkdirSync(targetFolder);
                copyFolderRecursiveSync(curSource, targetFolder);
            } else {
                try {
                    fs.writeFileSync(targetFolder, fs.readFileSync(curSource));
                    logger.info('The copy performed successfully')
                } catch (err) {
                    logger.info(err.message)
                }
            }

        });
    }

}






