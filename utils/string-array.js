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
    this.iMax = N;
    this.jMax = M;
    this.array = array;
    this.reverseArray = this._reverse();
  }

  charAt(i, j){
    return this.array.charAt(i*this.jMax + j);
  }

  replaceCharAt(i, j, char){
    const index = i*this.jMax + j;
    this.array = this.array.substr(0, index) + char + this.array.substr(index+1);
    this.reverseArray = this._reverse();
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
    if(typeof start == 'number'){
      return this.array.substring(i*this.jMax, (i+1)*this.jMax)
          .substr(start, end);
    }
    return this.array.substring(i*this.jMax, (i+1)*this.jMax);
  }

  getColumn(j, start, end) {
    if(start && end){
      return this.reverseArray.substring(j*this.iMax, (j+1)*this.iMax)
          .substr(start, end);
    }
    return this.reverseArray.substring(j*this.iMax, (j+1)*this.iMax);
  }

  /** Fine longer line/column **/
  getLonger(){
    const line = this.getLongerLine();
    const column = this.getLongerColumn();

    let max = line.value > column.value ? line : column;

    // Square only if at least a line exist
    if(max.value > 2){
      const square = this.getBiggerSquare();
      if(square.val > max.value){
        console.log(square);
        square.type = 'square';
        return square;
      }
    }

    return max;
  }

  getLongerLine() {
    var max = {value: 0, pos: {}};
    // For each line
    for(let i = 0; i < this.iMax; i++){

      // Get line and split on symbol
      let line = this.array.substring(i*this.jMax, (i+1)*this.jMax);
      let arr = line.split(SYMBOL_OFF);

      // Find the max occurence
      let lineMax = arr.reduce((max, current) => {
        if(max.value < current.length) {
          max.value = current.length;
          max.pos = {start: max.index, end: max.index + current.length -1}
        }
        max.index += 1 + current.length;
        return max;
      }, {value: 0, index: 0, pos: {}});

      // Check if bigger
      if(lineMax.value > max.value){
        max = lineMax;
        max.row = i;
      }
    }

    delete max.index;
    return max;
  }

  getLongerColumn() {
    var max = {value: 0, pos: {}};
    for(let j = 0; j < this.iMax; j++){

      // Get line and split on
      let line = this.reverseArray.substring(j*this.iMax, (j+1)*this.iMax);
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
        max.column = j;
      }
    }

    delete max.index;
    return max;
  }

  /** Bigger square **/
  getBiggerSquare() {
    const max = this.iMax > this.jMax ? this.jMax : this.iMax;

    for(let d = max; d > 2; d--){
      if(d%2 == 1){
        for(let i = 0; i < this.iMax-d; i++){
          for(let j = 0; j < this.jMax-d; j++){
            if(i == 6 && j == 45 && d == 3){
              console.log(this.allBlack(i, j, d));
            }
            if(d>2){
              if (this.allBlack(i, j, d)) {
                const s = (d-1)/2;
                return {x: i+s, y: j+s, s, val: d*d};
              }
            }
          }
        }
      }
    }
    return {};
  }

  allBlack(iStart, j, d) {
    for(let i = iStart; i < (iStart + d); i++){
      if(this.getLine(i, j, (j+d)).indexOf(SYMBOL_OFF) > -1){
        return false;
      }
    }
    return true;
  }

  /** Rendering array/reverse**/
  render() {
    let render = this.iMax + ' '+ this.jMax + '\n';
    for (let i = 0; i < this.iMax; i++) {
      render += this.getLine(i) + '\n';
    }
    return render;
  }

  renderReverse(){
    let render = this.jMax + ' ' + this.iMax + '\n';
    for(let j = 0; j < this.jMax; j++){
      render += this.getColumn(j) + '\n';
    }
    return render
  }

  /** Reverse array **/
  _reverse() {
    let newArray = '';

    for(let j = 0; j < this.jMax; j++){
      for(let i = 0; i < this.iMax; i++){
        newArray += this.charAt(i, j);
      }
    }
    return newArray;
  }

  /** Remove line **/
  remove(command) {
    const values = command.split(' ');

    if(values[0] == 'PAINT_SQUARE'){
      // Squares
      this.removeSquare(values[1], values[2], 2*+values[3]+1)
    } else {
      // Lines
      if(values[1] == values[3]){
        this.removeLine(+values[1], +values[2], +values[4]);
      }

      if(values[2] == values[4]){
        this.removeColumn(+values[2], +values[1], +values[3]);
      }
    }
  }

  removeLine(row, a, b) {
    for(let j = a; j <= b; j++) {
      this.replaceCharAt(row, j, SYMBOL_OFF);
    }
  }

  removeColumn(column, a, b){
    for(let i = a; i <= b; i++) {
      this.replaceCharAt(i, column, SYMBOL_OFF);
    }
  }

  removeSquare(iStart, j, d){
    for(let i = iStart; i < (iStart+d); i++){
      this.removeLine(i, j, (j+d));
    }
  }
}

module.exports = StringArray;
