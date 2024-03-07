const { TextDecoder, TextEncoder } = require('node:util')
 
Object.defineProperties(globalThis, {
  TextDecoder: { value: TextDecoder },
  TextEncoder: { value: TextEncoder },
})

if (!window.setImmediate) {
  window.setImmediate = function(callback) {
    setTimeout(callback, 0);
  };
}

setImmediate(function() {
  console.log("This is a callback function.");
});