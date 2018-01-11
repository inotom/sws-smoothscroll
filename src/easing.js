// easing function (easeOutCubic)
module.exports = (t, b, c, d) => {
  return c * ((t = t / d - 1) * t * t + 1) + b;
};
