'use strict';

const expect = require('expect');

const remove = require('../remove');
const {
  init,
  write,
  open
} = require('../../filer');

describe('remove methods', function(){
  const filepath = 'test.txt';
  const data = 'this is sample text';

  beforeEach(function(done){
    init()
      .then(() => write(filepath, { data, type: 'text/plain'}))
      .then(() => done(), done);
  });

  it('removes a file at a given filepath', function(done){
    const errName = 'NOT_FOUND_ERR';
    remove(filepath)
      .then(function(){
        return init().then(() => open(filepath));
      })
      .catch(function(err){
        expect(err.name).toEqual(errName);
      })
      .then(() => done(), done);
  });
});
