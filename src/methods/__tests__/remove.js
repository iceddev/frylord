'use strict';

const expect = require('expect');

const remove = require('../remove');
const {
  init,
  ls,
  write,
  open
} = require('../../filer');

describe('remove methods', function(){
  const filepath = 'test.txt';
  const data = 'this is sample text';

  beforeEach(function(){
    return init()
      .then(() => write(filepath, { data, type: 'text/plain'}));
  });

  after(function(){
    return init()
      .then(() => ls('/'));
  });

  it('removes a file at a given filepath', function(){
    const errName = 'NOT_FOUND_ERR';
    return remove(filepath)
      .then(() => open(filepath))
      .catch((err) => {
        expect(err.name).toEqual(errName);
      });
  });
});
