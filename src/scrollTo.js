const INTERVAL = 16;
const SPEED = 1000;
const easing = require('./easing.js');

let intervalId;

module.exports = (from, to) => {
  const startTime = (new Date());
  const distance = to - from;

  if (distance === 0) {
    return;
  }

  intervalId = setInterval(() => {
    const time = (new Date()) - startTime;
    let current = easing(time, from, distance, SPEED);

    if (time > SPEED) {
      clearInterval(intervalId);
      current = from + distance;
    }

    window.scrollTo(0, current);
  }, INTERVAL);
};
