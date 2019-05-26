module.exports = async (ctx) => {
  console.log('Test!', ctx.cookies.get('token'), ctx);
  ctx.body = 'Hello World!';
  ctx.cookies.set('token', '7h9nv5a24y9on56bs4y9bs45', {httpOnly: false})
  console.log(ctx.headers.cookie);
}