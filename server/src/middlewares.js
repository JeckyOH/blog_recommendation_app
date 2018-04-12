exports.allowCrossOrigin = function () {
  return (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'X-Requested-With');
    next();
  };
};
