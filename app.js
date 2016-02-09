'use strict';

var File = require('./file');
var StringArray = require('./utils/string-array');

File.read('in.in', (data) => {
  const array = data
      .replace(/\r?\n|\r/g, '')
      .substring(2);

  const N = data.charAt(0);
  const M = data.charAt(1);

  const stringArray = new StringArray(N, M, array);

  //File.write('out.out', stringArray.shrink(1, 2, 3, 2));
  console.log(data);
  console.log(stringArray.getBiggestLine());
});

