import fs from 'fs';
import path from 'path'; 
import dotenv from 'dotenv';

var i = 0

dotenv.config()

const copyFileSync = ( source, target ) => {

    var targetFile = target;

    // If target is a directory, a new file with the same name will be created
    if ( fs.existsSync( target )  ) {
        if ( fs.lstatSync( target ).isDirectory() ) {
            targetFile = path.join( target, path.basename( source ) ); //Composes the path of the created file
        }
    }
    
    fs.writeFileSync(targetFile, fs.readFileSync(source));
}


export const copyFolderRecursiveSync = ( source, target )=> {
    i = i+1;
    var files = [];
    var targetFolder = "";
    if(i==1){ //If it is the first iteration of the recursion
        targetFolder = target; 
    }
    else{
    targetFolder= path.join( target, path.basename( source ) );
    }
    // Check if folder needs to be created or integrated
    if ( !fs.existsSync( targetFolder ) ) {
        fs.mkdirSync( targetFolder );
    }

    // Copy
    
    if ( fs.lstatSync( source ).isDirectory() ) {
        files = fs.readdirSync( source );
        files.forEach( function ( file ) {
            var curSource = path.join( source, file );
            if ( fs.lstatSync( curSource ).isDirectory() ) {  
                copyFolderRecursiveSync( curSource, targetFolder );
            } else {
                copyFileSync( curSource, targetFolder );
            }

        } );
    }

}
    
