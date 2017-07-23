const path = require('path');
const fs = require('fs');

function resolve(from, to) {
  let final;
  let to_file;
  // console.log('to is:', to);
  if (to.split('/').length > 1) {
    // console.log('after split');
    if (path.dirname(to) === '.') {
      to_file = `${path.basename(to)}.js`;
      final = path.join(path.dirname(from), to_file);
    } else {
      to_file = `${path.basename(to)}.js`;
      final = path.join(path.dirname(to), to_file);
    }
  } else {
    final = '/project/node_modules';
    final = path.join(final, path.basename(to), 'index.js');
  }
  if (fs.existsSync(final)) {
    // console.log('final is: ', final);
    return final
  } else {
    throw new Error('file not found')
  }
}

module.exports = resolve;
