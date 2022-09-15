export const naverLogin = new window.naver.LoginWithNaverId({
  clientId: 'IQ2SgIZNtAxUm3kXGTZz',
  callbackUrl: 'http://localhost:3000/logining',
  loginButton: { color: 'green', type: 3, height: 40 },
});
