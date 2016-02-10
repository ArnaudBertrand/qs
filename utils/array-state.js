'use strict';

var StringArray = require('./string-array');

class ArrayState {
  constructor(arr){
    const array = arr
        .replace(/\r?\n|\r/g, '')
        .substring(2);
    const N = arr.charAt(0);
    const M = arr.charAt(1);

    this.stringArray = new StringArray(N, M, array);
  }

  run(){
    console.log(this.stringArray.render());
    console.log('------');
    const longer = this.stringArray.getLonger();
    this.generateCommand(longer);
  }

  generateCommand(max){
    let command = 'PAINT_LINE ';
    if(max.column){
      command += `${max.pos.start} ${max.column} ${max.pos.end} ${max.column}`;
    } else {
      command += `${max.row} ${max.pos.start} ${max.row} ${max.pos.end}`;
    }
    this.stringArray.remove(command);
  }
}

module.exports = ArrayState;
