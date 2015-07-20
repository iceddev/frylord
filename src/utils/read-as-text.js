'use strict';

const when = require('when');

function readAsText(file){
  return when.promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (evt) => resolve(evt.target.result);
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

module.exports = readAsText;
