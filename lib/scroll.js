'use strict';

var scrollTo = require('./scrollTo.js');

module.exports = function (hash, el) {
  var dl = document.documentElement;
  var rect = el.getBoundingClientRect();
  var docH = dl.scrollHeight;
  var winH = window.innerHeight || dl.clientHeight;
  var from = window.pageYOffset || dl.scrollTop || document.body.scrollTop || 0;
  var to = from + rect.top;
  if (docH - winH < to) {
    to = docH - winH;
  }
  scrollTo(from, to);
};