const getHash = require('./getHash.js');
const scroll = require('./scroll.js');

module.exports = () => {
  const anchors = document.querySelectorAll('A,AREA');

  let isScrolling = false;

  for (let i = 0, len = anchors.length; i < len; i++) {
    const anc = anchors[i];
    const hash = getHash(anc.href);
    if (hash) {
      anc.addEventListener('click', (e) => {
        e.preventDefault();
        const el = document.getElementById(hash);
        if (!isScrolling) {
          scroll(hash, el);
        }
      });
    }
  }

  let timeoutID;

  window.addEventListener('scroll', () => {
    isScrolling = true;

    if (timeoutID) {
      clearTimeout(timeoutID) ;
    }
    timeoutID = setTimeout(() => {
      isScrolling = false;
    }, 500) ;
  });
};
