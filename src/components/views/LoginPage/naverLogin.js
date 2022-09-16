export const naverLogin = new window.naver.LoginWithNaverId({
  clientId: process.env.REACT_APP_CLIENTID,
  callbackUrl: process.env.REACT_APP_CALLBACKURL,
  loginButton: { color: 'green', type: 3, height: 40 },
});
