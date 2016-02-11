'use strict';

//var StringArray = require('./string-array');
var ArrayParser = require('./array');

class ArrayState {
  constructor(arr) {
    var array = arr.split(/\r?\n|\r/g);
    var args = array.shift().split(' ');
    var N = args[0];
    var M = args[1];

    console.log(N, M, array);
    // String array
    //const array = arr
    //    .replace(/\r?\n|\r/g, '')
    //    .substring(arr.search(/\r?\n|\r/));
    //const N = arr.substr(0, arr.indexOf(' '));
    //const M = arr.substr(arr.indexOf(' ')+1, arr.search(/\r?\n|\r/)-3);
    //console.log(N, M);
    //this.stringArray = new StringArray(+N, +M, array);

    this.arrayParser = new ArrayParser(+N, +M, array);
    this.commands = [];
  }

  run(cb) {
    this.recursive(cb);
  }

  recursive(cb){
    const longer = this.arrayParser.getLonger();
    if(longer.value === 0){
      return cb();
    }
    this.generateCommand(longer);
    this.recursive(cb);
  }

  generateCommand(max) {
    if(max.type == 'square'){
      // Square
      let command = `PAINT_SQUARE ${max.x} ${max.y} ${max.s}`;
      this.arrayParser.remove(command);
      this.commands.push(command);
    } else {
      // Line
      let command = 'PAINT_LINE ';

      if(typeof max.column !== 'undefined'){
        command += `${max.pos.start} ${max.column} ${max.pos.end} ${max.column}`;
      }
      if(typeof max.row !== 'undefined'){
        command += `${max.row} ${max.pos.start} ${max.row} ${max.pos.end}`;
      }
      this.arrayParser.remove(command);
      console.log(command);
      this.commands.push(command);
    }
  }

  getArray() {
    return this.arrayParser.render();
  }

  listCommand() {
    return this.commands.join('\n');
  }
}

module.exports = ArrayState;
