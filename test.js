"use strict";
const assert = require('assert');
const difunc = require('./index.js');

assert.throws(() => {
  difunc(null, () => {});
}, /null was not/);

assert.throws(() => {
  difunc({}, 'foo');
}, /foo was not typeof function/);

assert.throws(() => {
  difunc({}, a => {});
}, /a was not defined in dependencies/);

assert.equal(difunc({a: 5}, a => a), 5);
assert.equal(difunc({a: 5}, (a) => a), 5);
assert.equal(difunc({a: 5, b: 6}, (a, b) => a + b), 11);
assert.equal(difunc({a: 5, b: 6}, (/*asdf*/a,// asdfasdf
  b) => a + b), 11);
assert.equal(difunc({a: 5}, function(a) {return a;}), 5);
assert.equal(difunc({a: 5}, function asdf(a) {return a;}), 5);
assert.equal(difunc({a: 5, b: 6}, function(a, b) {return a + b;}), 11);
assert.equal(difunc({a: 5, b: 6}, function asdf(a, b) {return a + b;}), 11);
assert.equal(difunc({a: 5, b: 6}, function(/*asdf*/a,// asdfasdf
  b) {return a + b;}), 11);
/*
assert.throws(() => {
  difunc({a: 5, b: 6}, ({a}, b) => a + b);
}, /destructuring is not supported/);
assert.throws(() => {
  difunc({a: 5, b: 6}, (a = 5, b) => a + b);
}, /default parameters are not supported/);
*/
