let public = exports.public = {};

public.ping = () => 'pong';
public.log = (msg) => {console.log(msg)};
public.test = () => (ctx) => console.log(ctx);
public.cookie = () => async ({cookies}) => {
  console.log(cookies.get('testCookie'));
  let a = cookies.set('testCookie', 'it works, yay', {httpOnly: false, withCredentials: true})
  console.log(a);
}
public.headers = () => (ctx) => {
  console.log(ctx.get('test'));
  ctx.set('testy', 'working here')
}
public.new = () => (session) => {
  console.log(session);
}
public.connect = () => 'token received'
public.session = () => (session) => console.log(session);