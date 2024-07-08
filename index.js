const http = require('node:http');
const path = require('node:path');
const rl = require('node:readline/promises');
const fscl = require('node:fs');
const fs = require('node:fs/promises');
const os = require('node:os');
const {emitter} = require('./emiter');

const foo = async () => {

// HTTP
// const server = http.createServer((req, res) => {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end('Hello World\n2222');
// })
// server.listen(3000);

// Path
// console.log(__filename)
// console.log(path.basename(__filename));
// console.log(path.dirname(__filename));
// console.log(path.extname(__filename));
// console.log(path.parse(__filename));
// console.log(path.normalize('/home/maksym///////\/////WORK////\///Lessons/jan-2024-nodejs/index.js'));
// console.log(path.isAbsolute('/home/maksym/WORK/Lessons/jan-2024-nodejs/index.js'))
// console.log(path.isAbsolute('./home/maksym/WORK/Lessons/jan-2024-nodejs/index.js'))

// Readline
//     const rlInstance = rl.createInterface({
//         input: process.stdin,
//         output: process.stdout
//     });
//
//     const name = await rlInstance.question('Enter your name: ');
//     console.log(`Hello, ${name}!`);
//     const age = await rlInstance.question('Enter your age: ');
//     console.log(`You are ${age} years old!`);
//     process.exit(0);

    // FS
    // const pathToFile = path.join(__dirname, 'some_dir', 'test.txt');
    // await fs.writeFile(pathToFile, 'Hello, world!')
    // const data = await fs.readFile(pathToFile, 'utf-8')
    // console.log(data);
    // await fs.appendFile(pathToFile, '\n Hello, world again!')
    //
    // await fs.mkdir(path.join(__dirname, 'some_dir', 'new_dir', 'new_dir2'), {recursive: true})
    // // await fs.rmdir(path.join(__dirname, 'some_dir', 'new_dir', 'new_dir2'))
    // await fs.writeFile(path.join(__dirname, 'some_dir', 'new_dir', 'new_dir2', 'test.txt'), 'Hello, world!')
    // await fs.rm(path.join(__dirname, 'some_dir', 'new_dir'), {recursive: true})
    // // await fs.unlink(path.join(__dirname, 'test.txt'))
    // // await fs.rename(path.join(__dirname, 'some_dir', 'test.txt'), path.join(__dirname, 'test222.txt'))
    // // await fs.copyFile(path.join(__dirname, 'some_dir', 'test222.txt'), path.join(__dirname, '111.txt'))
    // const stat = await fs.stat(path.join(__dirname, 'some_dir', 'test222.txt'))
    // console.log(stat.isDirectory())
    // console.log(stat.isFile())
    //
    // // FS stream
    // const readStream = fscl.createReadStream(path.join(__dirname, 'big_file.pdf'))
    // const writeStream = fscl.createWriteStream(path.join(__dirname, 'big_file_copy.pdf'))
    //
    // readStream.on('data', (chunk) => {
    //     console.log(chunk);
    //     writeStream.write(chunk)
    // });
    // readStream.pipe(writeStream)

    // OS
    // console.log(os.arch());
    // console.log(os.cpus());
    // console.log(os.hostname());
    // console.log(os.homedir());
    // console.log(os.freemem() / 1024 / 1024 / 1024);
    // console.log(os.totalmem() / 1024 / 1024 / 1024);


    emitter.emit('test2', 'qwe', 'asd', 222)
    emitter.emit('test2', 'SSS', 'WWWWW', 111)
    emitter.emit('create_user', {name: 'maks', age: 28})
    emitter.emit('create_user', {name: 'Dima', age: 28})

}

void foo()
