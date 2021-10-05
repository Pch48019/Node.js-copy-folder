import fs from 'fs';
import http from 'http';
import {copyFolderRecursiveSync} from './copy-folder.js';
import dotenv from 'dotenv';
import {logger} from './logger.js';


dotenv.config()

var server = http.createServer( (req, res) => {   //create web server
    if (req.url == '/') { //check the URL of the current request
        
        // set response header
        res.writeHead(200, { 'Content-Type': 'text/html' }); 
        
        // set response content    
        res.write('<html><body><p>This is home Page.</p></body></html>');
        res.end();
    
    }
    else if (req.url == "/copy-folder") {
      if(fs.existsSync(process.env.SOURCE_FOLDER)){ 
         try{

                if(!fs.existsSync(process.env.TARGRT_FOLDER)){//If there is no target folder
                  try{
                      fs.mkdirSync( process.env.TARGET_FOLDER ); 
                     }
                  catch(err){
                    logger.error(err.message);
                  }  

                  }
                  const isEmpty = fs.readdirSync(process.env.SOURCE_FOLDER).length 
                  if(isEmpty !== 0){ //if the source folder is empty
                      try{
                        copyFolderRecursiveSync(process.env.SOURCE_FOLDER,process.env.TARGRT_FOLDER);
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.write('<html><body><p>The copy performed successfully</p></body></html>');
                        logger.info('The copy performed successfully')
                        res.end();
                      }
                      catch(err){
                        logger.error(err.message);
                      }
                    } 
                  else {
                    logger.error('There is nothing to copy');
                    res.end(); 
                    
                  }
                
        }
        catch(err){       
             logger.error(err.message);
        }
      }
      else{
        logger.error('source folder is not exists');
      }
    
    }
    else if (req.url == "*"){
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write('<html><body><p>The page not found.</p></body></html>');
        logger.error('The page not found.');
        res.end();
      
    }
    
});

server.listen(process.env.PORT); // listen for any incoming requests

logger.info('Node.js web server at port 3000 is running..');

  

  

  




 

