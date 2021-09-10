const fs = require('fs');
let commentReGex = /\/\*[\s\S]*?\*\/|([^\\:]|)\/\/.*$/gm
fs.readFile('../the-super-tiny-compiler/the-super-tiny-compiler.js','utf8', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    fs.writeFile('no_comment_compiler.js', data.replace(commentReGex, '$1'), 'utf8', ()=>{
        console.log('everything went ok');
        return;
    })
})
