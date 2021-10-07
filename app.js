import {copyFolderRecursiveSync} from './copy-folder.js';
import dotenv from 'dotenv';
import {logger} from './logger.js';


dotenv.config()

 
try{
 copyFolderRecursiveSync(process.env.SOURCE_FOLDER,process.env.TARGRT_FOLDER);
}catch(err){
   logger.error(err.message);
}  
                        
        
  
 