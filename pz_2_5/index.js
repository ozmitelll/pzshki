const fs = require('fs');
const path = require("path");
const colors = require('colors');
const {bold} = require("colors");
const {dirname} = require("path");
const prompt = require('prompt-sync')();

console.log('FileManager - v0.1.0' + "\n" + 'Created by ozmitelll.' + '\n\n' + "<- Menu ->\n");
let input = null;
let dirName = '';
let fileName = '';
showNavMenu();


function showNavMenu() {
    console.log("\n" + "Current directory <" + dirName + ">\n\n" +
        "\n1. Show files in directory" +
        "\n" + "2. Switch between directories" +
        "\n" + "3. Create file or directory" +
        "\n" + "4. Read file" +
        "\n" + "5. Edit files" +
        "\n" + "6. Rename files or directories" +
        "\n" + "7. Delete files or directories" +
        "\n" + "8. Get info about a file or directory" +
        "\n" + "9. Exit program" +
        "\n" + "10. Go back" + "\n\n")
    input = prompt("Write in terminal what you want to do: -> ")

    switch (input) {
        case '1':
            console.clear();
            if (dirName === '') {
                dirName = prompt('Write a directory path : -> ')
                console.log("Files in directory : => " + dirName +"\n");
                showFilesInDirectory(dirName)
            } else {
                console.log("Files in directory : => " + dirName+"\n");
                showFilesInDirectory(dirName)
            }
            return;
        case '2': {
            console.clear();
            if (dirName === '') {
                dirName = prompt('Write a directory path : -> ')
                showNavMenu();
            } else {
                dirName = prompt('Write a directory path what you want switch : -> ')
                fileName =''
                showNavMenu();
            }
            return;
        }
        case '3': {
            console.log(dirName);
            if (dirName !== '') {
                createFileOrDirectory(dirName)
                return;
            } else {
                console.clear();
                dirName = prompt('Write a directory path : -> ')
                createFileOrDirectory(dirName)
                return;
            }

        }
        case '4': {
            console.clear();
            if (dirName === '') {
                dirName = prompt('Write a directory path : -> ')
                ReadFileInDirectory(dirName);
            }
            else {
                ReadFileInDirectory(dirName);
            }
            return;
        }
        case '5': {

            return;

        }
        default:
            console.clear()
            console.log('You must be a vigilant! Try again...\n\n');
            showNavMenu()
            break;
    }
}

function createFileOrDirectory(dirName) {
    console.clear();
    console.log('\n' + 'You are in this directory : ->' + dirName
        + "\n\n1. Create a file.\n2. Create a directory\n3. Go back\n\n");
    let input = +prompt('Write you choose this : -> ');
    switch (input) {
        case 1:
            createFile(dirName);
            break;
        case 2:
            createDirectory(dirName);
            break;
        case 3:
            console.clear();
            showNavMenu();
            break;
        default:
            console.clear()
            console.log('You must be a vigilant! Try again...\n\n');
            createFileOrDirectory(dirName);
            break;
    }
}

function createFile(dirName) {
    let input = prompt('Write file name: =>')
    fs.appendFile(dirName + input, 'File created!', function (err) {
        if (err) throw err;
        console.log('Saved!'.green);

    });
    setTimeout(function () {
        createFileOrDirectory(dirName);
    }, 2000)

}

function createDirectory(path) {
    let dirName = prompt('Write directory name: ->');
    fs.access(path + dirName, (error) => {
        if (error) {
            fs.mkdir(path + dirName, (error) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log("New Directory created successfully !!".green);
                    setTimeout(function () {
                        createFileOrDirectory(path)
                    }, 2000);
                }
            });
        } else {
            console.log("Given Directory already exists !!".yellow);
            setTimeout(function () {
                createFileOrDirectory(path)
            }, 2000);

        }
    })
}

function showFilesInDirectory(dirName) {
    let indexer = 1;
    fs.readdir(dirName, {withFileTypes: true },(err, files) => {
        if (err)
            console.log(err);
        for (let i = 0; i < files.length; i++) {
            if(files[i].isDirectory()) {
                console.log("\t" + indexer.toString().italic.underline.dim.bold + '\t' + files[i].name.blue.bold);
                indexer++
            }
            else if(files[i].isFile()){
                console.log("\t" + indexer.toString().italic.underline.dim.bold + '\t' + files[i].name.green.bold);
                indexer++
            }
        }
            showNavMenu();
    });
}

function ReadFileInDirectory(dirName){
    console.clear();
    let arrayCorrectFiles = new Array();
    let fileIndex = 0;
    console.log("Files in this directory : -> "+dirName+ "\n")
    let index = 1;
    fs.readdir(dirName, {withFileTypes: true }, (err, files) => {
        if (err)
            console.log(err);
        for (let i = 0; i < files.length; i++) {
            if(files[i].isFile()){
                console.log("\t"+index.toString().italic.underline.red +"\t"+ files[i].name.bold.bgGreen)
                arrayCorrectFiles.push(files[i].name)
                index++;
            }
        }
        console.log("\n")
        fileIndex = +prompt("Choose file for read (write 1-"+(index-1)+") : ->");
        fileName = arrayCorrectFiles[fileIndex-1];

        fs.readFile(dirName+fileName, 'utf-8', function(err, data){
            console.log(data);
            let key = prompt("\n\nWrite any key for back...\n");
            switch (key){
                default:
                    showNavMenu()
                    break;
            }
        });

    });
}


