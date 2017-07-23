const resolver = require('../resolver');
const fs = require('fs');

const requireRe = /\brequire\s*?\(\s*?(['"])([^"']+)\1\s*?\)/g;
const fileRe = /(["'])(?:(?=(\\?))\2.)*?\1/g

function bundle(entry) {
  const entrySource = fs.readFileSync(entry);
  // console.log(entrySource)
  const toVisit = parseRequires(entrySource);
  // console.log(toVisit);
  const modules = [];
  // console.log('toVisit: ', toVisit);
  while(toVisit.length > 0) {
    // console.log('in while loop');
    const module = toVisit.pop();
    // console.log('resolving:', resolver(entry, module));
    const source = fs.readFileSync(resolver(entry, module));
    // console.log('source is', source);
    const requires = parseRequires(source);
    modules.push({
      source,
      requires,
    });
    console.log(modules);
  //   toVisit = tovisit.concat(requies);
  }

  // let source = define.ToString();
  // modules.forEach(module => PageTransitionEventconst module)
}

function parseRequires(source){
  let requires = source.match(requireRe);
  // console.log('requires', requires);
  requires = requires.map((element) => {
    return source.match(fileRe)[0].replace(/\"/g, '');
  });
  return requires;
}

module.exports = { bundle };
