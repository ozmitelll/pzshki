const fs = require('fs')
const path = require('path')
const colors = require('colors')
const readline = require('readline')
const {readdir, stat} = require("fs/promises");
const {stdin: input, stdout: output} = require("node:process");
const {EventEmitter} = require("events");


const commands = new EventEmitter();
const rl = readline.createInterface({input, output,});

let currentDir = path.join(__dirname);

//<{FUNCTION FOR COMMANDS}>//

const showFilesInDirectory = () => {
    fs.readdir(currentDir, (err, files) => {
        if (err) {
            console.log(colors.bold('Каталог не існує або недоступний').bgRed)
            return;
        }
        for (const file of files) {
            fs.stat(path.join(currentDir, file), (err, stats) => {
                if (err) {
                    return;
                }
                if (stats?.isDirectory()) {
                    console.log(colors.blue(`-> ${file}`))
                } else if (stats?.isFile()) {
                    console.log(colors.green(`-> ${file}`))
                }
            })
        }
        currentLocation()
    })
}
const changeLocation = (dir) => {
    fs.access(dir, (err) => {
        if (err) {
            console.log(colors.bold('Каталог не існує або недоступний').bgRed)
            return;
        }
        currentDir = dir;
        currentLocation()
    })
}
const createFile = (name) => {
    fs.writeFile(path.join(currentDir, name), '', (err) => {
        if (err) {
            console.log(colors.red('Неможливо створити файл!'))
            return;
        }
        console.log(`Файл ${colors.green(name).underline.bold} створено!`)
        currentLocation()
    })
}
const createDir = (dirName) => {
    fs.mkdir(path.join(currentDir, dirName), (err) => {
        if (err) {
            console.log(colors.red('Неможливо створити директорію!'))
            return;
        }
        console.log(`Директорію ${colors.blue(dirName).underline.bold} створено!`)
        currentLocation()
    })

}
const readFile = (name) => {
    fs.readFile(path.join(currentDir, name), 'utf-8', (err, data) => {
        if (err) {
            console.log(colors.red('Файл не існує або недоступний!'))
            return;
        }
        console.log(`\nВміст файлу: ${colors.green(path.join(currentDir, name))}:\n`)
        console.log(colors.bgBlack(colors.yellow(data)))
        currentLocation()
    })
}
const editFile = (name) => {
    rl.question(`Ви дійсно хочете редагувати ${colors.green(name)}? (Y/N)`, (answer) => {
        if (answer.match(/^y(es)?$/i)) {
            fs.readFile(path.join(currentDir, name), 'utf-8', (err, data) => {
                if (err) {
                    console.log(colors.red('Ви не може редагувати цей файл!'))
                    return;
                }

                console.log(`\nВміст файлу ${colors.green(path.join(currentDir, name))}:\n`)
                console.log(colors.bgBlack(colors.yellow(data)))

                rl.question('Введіть новий текст:', (newContent) => {
                    fs.writeFile(path.join(currentDir, name), newContent, (err) => {
                        if (err) {
                            console.log('Ви не може редагувати цей файл!')
                            return;
                        }

                        console.log(`Файл ${colors.green(name)} відредактовано!`)
                        currentLocation()
                    })
                })
            })
        } else {
            currentLocation()
        }
    })
}
const renameDirOrFile = (oldName, newName) => {
    rl.question(`Ви дійсно хочете перейменувати ${colors.red(oldName)} (Y/N)`, (answer) => {
        if (answer.match(/^y(es)?$/i)) {
            fs.rename(path.join(currentDir, oldName), path.join(currentDir, newName), (err) => {
                if (err) {
                    console.log('Ви не можете перейменувати!')
                    return;
                }

                console.log(`${colors.red(oldName)} перейменовано на ${colors.green(newName)}!`);
                currentLocation()
            })
        } else {
            currentLocation()
        }
    })
}
const deleteDirOrFile = (name) => {
    rl.question(`Ви дійсно хочете видалити ${colors.red(name)} (Y/N)`, (answer) => {
        if (answer.match(/^y(es)?$/i)) {
            fs.stat(path.join(currentDir, name), (err, stats) => {
                if (err) {
                    console.log(`Ви не можете видалити ${colors.red(name)}!`)
                    return;
                }

                if (stats.isFile()) {
                    fs.unlink(path.join(currentDir, name), (err) => {
                        if (err) {
                            console.log(`Ви не можете видалити ${colors.red(name)}`)
                            return;
                        }
                        console.log(`${colors.green(name)} було видалено!`);
                        currentLocation()
                    })
                } else if (stats.isDirectory()) {
                    fs.rmdir(path.join(currentDir, name), (err) => {
                        if (err) {
                            console.log(`Ви не можете видалити ${colors.red(name)}!`)
                            return;
                        }
                        console.log(`${colors.blue(name)} було видалено!`)
                        currentLocation()
                    })
                }
            })
        } else {
            currentLocation()
        }
    })
}
const infoAboutFileOrDir = (name) => {
    fs.stat(path.join(currentDir, name), async (err, stats) => {
        if (err) {
            console.log(`Ви не можете подивитися інформацію про ${colors.red(name)}!`)
            return;
        }
        if (stats.isFile()) {
            console.log(`Інформація про ${colors.green(name)}:`)
            console.log(`Розмір: ${convertSize(stats.size)}`)
            console.log(`Власник: ${stats.uid}`)
            console.log(`Права доступу: ${stats.mode.toString(8).slice(-3)}`)
        } else if (stats.isDirectory()) {
            console.log(`Інформація про ${colors.blue(name)}:`)
            await dirSize(path.join(currentDir, name)).then(size => console.log(`Розмір: ${convertSize(size)}`))
            console.log(`Власник: ${stats.uid}`)
            console.log(`Права доступу: ${stats.mode.toString(8).slice(-3)}`)
        }
    })
}

const dirSize = async (dir) => {
    const files = await readdir(dir, {withFileTypes: true})

    const paths = files.map(async (file) => {
        const pth = path.join(dir, file.name)

        if (file.isDirectory()) return await dirSize(pth)
        if (file.isFile()) {
            const {size} = await stat(pth)
            return size
        }

        return 0
    })

    return (await Promise.all(paths)).flat(Infinity).reduce((i, size) => i + size, 0)
}

const convertSize = (size) => {
    let result = ''

    if (size < 1024) {
        result = `${size} Bytes`
    }
    if (size > 1024) {
        size /= 1024
        result = `${size.toFixed(3)} KB`
    }
    if (size > 1024) {
        size /= 1024
        result = `${size.toFixed(3)} MB`
    }
    if (size > 1024) {
        size /= 1024
        result = `${size.toFixed(3)} GB`
    }

    return result;
}

const showCommands = () => {
    console.log(colors.white('Набір команд та іх використання:\n').bold.underline.bgBlack)
    console.log(`${colors.cyan('see')} - Виводить вміст каталогу на якому ви перебуваєте.\n`)
    console.log(`${colors.cyan('cd <шлях_до_папки>')} - Команда для переходу з одного каталогу на інший для приладу вписується повний шлях до папки, чи файлу.\n\t\t\t${colors.bold('cd C:\\Users\\ozmitelll\\WebstormProjects\\pzshki').red}`)
    console.log(`${colors.cyan('create <назва_файлу>')} - Створює файл у каталозі на якому ви перебуваєте.\n\t\t\t${colors.bold('create newFile.txt').red}`)
    console.log(`${colors.cyan('mkdir <назва_папки>')} - Створює каталог у каталозі на якому ви перебуваєте.\n\t\t\t${colors.bold('mkdir newFolder').red}`)
    console.log(`${colors.cyan('read <назва_файлу>')} - Виводить вміст файлу який ви обрали.\n\t\t\t${colors.bold('read newFile.txt').red}`)
    console.log(`${colors.cyan('edit <назва_файлу>')} - Редагує вміст файлу який ви обрали.\n\t\t\t${colors.bold('edit newFile.txt').red}`)
    console.log(`${colors.cyan('rename <стара_назва> <нова_назва>')} - Перейменовує файл або каталог відповідно цього прикладу.\n\t\t\t${colors.bold('rename newFolder newRenamedFolder').red}`)
    console.log(`${colors.cyan('delete <назва_файлу_або_каталогу>')} - Видаляє обраний вами файл або каталог.\n\t\t\t${colors.bold('delete newFile.txt').red}`)
    console.log(`${colors.cyan('info <назва_файлу_або_каталогу>')} - Виводить всю доступну інформацію про каталог або файл, який ви обрали.\n\t\t\t${colors.bold('info newRenamedFolder').red}`)
    console.log(`${colors.cyan('exit')} - Вихід з програми.`)
}
const currentLocation = () => console.log(`Ви перебуваєте на ${colors.bold(currentDir).red}\n`)
console.log(colors.yellow(`Перш ніж використовувати программу прошу вас ознайомитись з командами , які вам потрібно буде писати у чат!\nПодивитись як їх використовувати можливо написавши команду ${colors.bgWhite('help').white}`))

const showMenu = () => {
    currentLocation();
    console.log('(see) - Переглянути вміст каталогу')
    console.log('(cd) - Перехід між каталогами')
    console.log('(create) - Створення файлу')
    console.log('(mkdir) - Створення каталогу')
    console.log('(read) - Переглянути вміст файлу')
    console.log('(edit) - Редагування файлу')
    console.log('(rename) - Перейменування файлу або каталогу')
    console.log('(delete) - Видалення файлу або каталогу')
    console.log('(info) - Перегляд інформації про файл або каталог')
    console.log('(exit) - Вихід з программи')
}
showMenu()

rl.on('line', (line) => {
    let command
    if (line.indexOf(" ") !== -1) {
        command = line.slice(0, line.indexOf(" "))
    } else {
        command = line
    }
    switch (command) {
        case 'see':
            commands.emit('see')
            break
        case 'cd':
            showMenu()
            commands.emit('cd', path.join(line.slice(3)));
            break
        case 'create':
            commands.emit('create', path.join(line.split(" ")[1]))
            break
        case 'mkdir':
            commands.emit('mkdir', path.join(line.split(" ")[1]))
            break
        case 'read':
            commands.emit('read', path.join(line.split(" ")[1]))
            break
        case 'edit':
            commands.emit('edit', path.join(line.split(" ")[1]))
            break
        case 'rename':
            let names = line.split(" ")
            commands.emit('rename', names[1], names[2])
            break
        case 'delete':
            commands.emit('delete', path.join(line.split(" ")[1]))
            break
        case 'info':
            commands.emit('info', path.join(line.split(" ")[1]))
            break
        case 'help':
            commands.emit('help')
            break
        case 'exit':
            rl.close()
            break
        default:
            console.log(colors.yellow(`Перш ніж використовувати программу прошу вас ознайомитись з командами , які вам потрібно буде писати у чат!\nПодивитись як їх використовувати можливо написавши команду ${colors.bgWhite('help').white}`))
    }
})

commands.on('see', () => showFilesInDirectory())
commands.on('cd', (dir) => changeLocation(dir))
commands.on('create', (name) => createFile(name))
commands.on('mkdir', (dirName) => createDir(dirName))
commands.on('read', (name) => readFile(name))
commands.on('edit', (name) => editFile(name))
commands.on('rename', (oldName, newName) => renameDirOrFile(oldName, newName))
commands.on('delete', (name) => deleteDirOrFile(name))
commands.on('info', (name) => infoAboutFileOrDir(name))
commands.on('help', () => showCommands())