'use strict';

var getHash = require('./getHash.js');
var scroll = require('./scroll.js');

module.exports = function () {
  var anchors = document.querySelectorAll('A,AREA');

  var isScrolling = false;

  var _loop = function _loop(i, len) {
    var anc = anchors[i];
    var hash = getHash(anc.href);
    if (hash) {
      anc.addEventListener('click', function (e) {
        e.preventDefault();
        var el = document.getElementById(hash);
        if (!isScrolling) {
          scroll(hash, el);
        }
      });
    }
  };

  for (var i = 0, len = anchors.length; i < len; i++) {
    _loop(i, len);
  }

  var timeoutID = void 0;

  window.addEventListener('scroll', function () {
    isScrolling = true;

    if (timeoutID) {
      clearTimeout(timeoutID);
    }
    timeoutID = setTimeout(function () {
      isScrolling = false;
    }, 500);
  });
};