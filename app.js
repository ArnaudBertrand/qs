'use strict';

var File = require('./file');
var ArrayState = require('./utils/array-state');

const lat = {'in': 'learn_and_teach.in', 'out': 'lat.out'};
const logo = {'in': 'logo.in', 'out': 'logo.out'};

File.read(logo.in, (data) => {
  const arrayState = new ArrayState(data);

  //File.write('out.out', stringArray.shrink(1, 2, 3, 2));
  arrayState.run(() =>{
    File.write(logo.out, arrayState.listCommand());
    //File.write('out.out', arrayState.getArray());
  });

});

