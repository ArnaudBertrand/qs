'use strict';

/**
 * Utils
 *
 * charAt(i, j)
 * shrink(xa, ya, xb, yb)
 * getLine(i, [start, end])
 * getColumn(j, [start, end])
 * getLonger()
 * getLongerLine()
 * getLongerColumn()
 * render()
 * renderReverse()
 * removeLine()
 * removeColumn()
 * _reverse()
 */

const SYMBOL_ON = '#';
const SYMBOL_OFF = '.';

class StringArray {
  constructor(N, M, array){
    this.w = M;
    this.h = N;
    this.array = array;
    this.reverseArray = this._reverse();
  }

  charAt(x, y){
    return this.array.charAt(x*this.w + y);
  }

  /** Shrink an array **/
  shrink(xa, ya, xb, yb) {
    let shrink = `${1+xb-xa}${1+yb-ya}`;
    for(let i = xa; i <= xb; i++) {
      shrink += this.getLine(i, ya, yb-1);
    }
    return shrink;
  }

  /** Get line/column **/
  getLine(i, start, end) {
    if(start && end){
      return this.array.substring(i*this.w, (i+1)*this.w)
          .substr(start, end);
    }
    return this.array.substring(i*this.w, (i+1)*this.w);
  }

  getColumn(j, start, end) {
    if(start && end){
      return this.reverseArray.substring(j*this.h, (j+1)*this.h)
          .substr(start, end);
    }
    return this.reverseArray.substring(j*this.h, (j+1)*this.h);
  }

  /** Fine longer line/column **/
  getLonger(){
    const line = this.getLongerLine();
    const column = this.getLongerColumn();

    return line.value > column.value ? line : column;
  }

  getLongerLine() {
    var max = {value: 0, pos: {}};
    for(let x = 0; x < this.h; x++){

      // Get line and split on
      let line = this.array.substring(x*this.w, (x+1)*this.w);
      let arr = line.split(SYMBOL_OFF);

      // Find the max occurence
      let lineMax = arr.reduce((max, current) => {
        if(max.value < current.length){
          max.value = current.length;
          max.pos = {start: max.index, end: max.index + current.length -1}
        }
        max.index += 1 + current.length;
        return max;
      }, {value: 0, index: 0, pos: {}});

      // Check if bigger
      if(lineMax.value > max.value){
        max = lineMax;
        max.row = x;
      }
    }

    delete max.index;
    return max;
  }

  getLongerColumn() {
    var max = {value: 0, pos: {}};
    for(let x = 0; x < this.w; x++){

      // Get line and split on
      let line = this.reverseArray.substring(x*this.h, (x+1)*this.h);
      let arr = line.split(SYMBOL_OFF);

      // Find the max occurence
      let lineMax = arr.reduce((max, current) => {
            if(max.value < current.length){
        max.value = current.length;
        max.pos = {start: max.index, end: max.index + current.length -1}
      }
      max.index += 1 + current.length;
      return max;
    }, {value: 0, index: 0, pos: {}});

      // Check if bigger
      if(lineMax.value > max.value){
        max = lineMax;
        max.column = x;
      }
    }

    delete max.index;
    return max;
  }

  /** Rendering array/reverse**/
  render() {
    let render = this.h + this.w + '\n';
    for (let i = 0; i < this.h; i++) {
      render += this.getLine(i) + '\n';
    }
    return render;
  }

  renderReverse(){
    let render = this.w + this.h + '\n';
    for(let j = 0; j < this.w; j++){
      render += this.getColumn(j) + '\n';
    }
    return render
  }

  /** Reverse array **/
  _reverse() {
    let newArray = '';

    for(let j = 0; j < this.w; j++){
      for(let i = 0; i < this.h; i++){
        newArray += this.charAt(i, j);
      }
    }
    return newArray;
  }

  /** Remove line **/
  remove(command) {
    const values = command.split(' ');

    if(values[1] == values[3]){
      this.removeColumn(values[1], values[2], values[4]);
    }

    if(values[2] == values[4]){
      this.removeLine(values[2], values[1], values[3]);
    }
  }

  removeLine(row, a, b) {
    console.log('remove line');
    console.log(row, a, b);
  }

  removeColumn(column, a, b){
    console.log('remove column');
    console.log(column, a, b);
  }
}

module.exports = StringArray;
