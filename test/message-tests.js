var test = require('tape')
var message = require('../src/message')

test('Message is as expected', function (t) {
  t.same(message, 'Hello world', 'Message is correct')
  t.end()
});
