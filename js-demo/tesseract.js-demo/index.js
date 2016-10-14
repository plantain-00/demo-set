var Tesseract = require('tesseract.js');

Tesseract.recognize("./demo.png", {
    lang: 'chi_sim',
}).progress(function (p) {
    console.log('progress', p);
}).then(function (result) {
    console.log(result.text)
});
