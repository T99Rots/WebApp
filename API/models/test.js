let public = exports.public = {};

public.ping = () => 'pong';
public.log = (msg) => {console.log(msg)};
public.test = () => (ctx) => console.log(ctx);
public.cookie = () => async ({cookies}) => {
  console.log(cookies.get('testCookie'));
  let a = cookies.set('testCookie', 'it works, yay', {httpOnly: false, withCredentials: true})
  console.log(a);
}