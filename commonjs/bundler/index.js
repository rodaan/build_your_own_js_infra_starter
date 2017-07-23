const resolver = require('../resolver');
const fs = require('fs');

const requireRe = /\brequire\s*?\(\s*?(['"])([^"']+)\1\s*?\)/g;
const fileRe = /(["'])(?:(?=(\\?))\2.)*?\1/g

function bundle(entry) {
  // resolve
  console.log('entry is:', entry);
  // console.log(resolver(entry));
  console.log('file is: ', fs.readFileSync(entry));
  const fileContent = fs.readFileSync(entry);
  console.log(fileContent.match(requireRe)[0].match(fileRe)[0].replace(/\"/g, ''));
  const file = fileContent.match(requireRe)[0].match(fileRe)[0].replace(/\"/g, '');
  console.log('resolver results:', resolver(entry, file));
  // bundle
  // return source string
  return resolver(entry, file);
}
module.exports = { bundle };
