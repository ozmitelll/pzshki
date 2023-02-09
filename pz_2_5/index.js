const events = require('events');
const colors = require('colors');
const fs = require('fs');

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
let showCurrentPath = __dirname;

let eventEmmiter = new events.EventEmitter();

console.log('FileManager - v0.1.0' + "\n" + 'Created by ozmitelll.' + '\n')

let showMenuHandler = function (){
    console.log("\n<- Menu ->\n"+
        "\n" + "Current path: " + showCurrentPath.underline.red + "\n"+
        "\n1. Show files in directory" +
        "\n" + "2. Switch between directories" +
        "\n" + "3. Create file or directory" +
        "\n" + "4. Read file" +
        "\n" + "5. Edit files" +
        "\n" + "6. Rename files or directories" +
        "\n" + "7. Delete files or directories" +
        "\n" + "8. Get info about a file or directory" +
        "\n" + "9. Exit program" +
        "\n\n")
}
let showFilesHandler = function (){
    console.clear();
    console.log('\tFiles in this path: \n')
    let indexer = 1;
    fs.readdir(showCurrentPath, {withFileTypes:true},function(err, items) {
        for (let i=0; i<items.length; i++) {
            if(items[i].isFile()){
                console.log('\t'+indexer.toString().italic.bold+'\t'+items[i].name.bold.green);
                indexer++;
            }
            if(items[i].isDirectory()){
                console.log('\t'+indexer.toString().italic.bold+'\t'+items[i].name.bold.blue);
                indexer++;
            }
        }
        inputText()
    });
}
let changeCatalog = function (){
    showCurrentPath =
}



function inputText(){
    eventEmmiter.emit('showNavMenu');
    readline.question('Write in terminal what you want (1-9): -> ',choose =>{

        switch (+choose){
            case 1:
                eventEmmiter.emit('showFilesList');
                return;
            case 2:

            default:
                console.log('default')
                break;
        }
        readline.close()
    })
}
eventEmmiter.on('showNavMenu', showMenuHandler)
eventEmmiter.on('showFilesList', showFilesHandler)

inputText()

