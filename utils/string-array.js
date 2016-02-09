'use strict';

const SYMBOL_ON = '#';
const SYMBOL_OFF = '.';

class StringArray {
  constructor(N, M, array){
    this.array = array;
    this.w = M;
    this.h = N;
  }

  chatAt(x, y){
    return this.array.charAt(x*this.w + y);
  }

  shrink(xa, ya, xb, yb) {
    let shrink = `${1+xb-xa}${1+yb-ya}`;
    for(let i = xa; i <= xb; i++) {
      shrink += this.getLine(i, ya, yb-1);
    }
    return shrink;
  }

  getLine(x, start, end) {
    let line = this.array.substring(x*this.w, (x+1)*this.w);
    if(start && end){
      line = line.substr(start, end);
    }
    return line;
  }

  getBiggestLine() {
    var max = {value: 0, pos: {}};
    for(let x = 0; x < this.h; x++){
      let line = this.array.substring(x*this.w, (x+1)*this.w);
      let arr = line.split(SYMBOL_OFF);
      var lineMax = arr.reduce((max, current) => {
        if(max.value < current.length){
          max.value = current.length;
          max.pos = {start: max.index, end: max.index + current.length -1}
        }
        max.index += 1 + current.length;
        return max;
      }, {value: 0, index: 0, pos: {}});

      if(lineMax.value > max.value){
        max = lineMax;
      }
    }
    return max;
  }

}

module.exports = StringArray;
