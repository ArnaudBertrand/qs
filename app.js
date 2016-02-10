'use strict';

var File = require('./file');
var ArrayState = require('./utils/array-state');

File.read('in.in', (data) => {
  const arrayState = new ArrayState(data);

  //File.write('out.out', stringArray.shrink(1, 2, 3, 2));
  arrayState.run();
});

