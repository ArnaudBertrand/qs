const fs = require('fs');

exports.read = function (path, cb) {
  fs.readFile(path, 'utf-8', (err, data) => {
    if(err) {
      return console.log(err);
    }

    cb(data);
  })

};

exports.write = function (path, text){
  fs.writeFile(path, text, (err) => {
    if(err) {
      return console.log(err);
    }

    console.log("The file was saved!");
  });
}
