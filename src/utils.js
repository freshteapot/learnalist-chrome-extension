function isObjectEmpty(test) {
  return Object.entries(test).length === 0 && test.constructor === Object
}

function hasWhiteSpace(s) {
  return s.indexOf(' ') >= 0;
}

export {isObjectEmpty, hasWhiteSpace}
