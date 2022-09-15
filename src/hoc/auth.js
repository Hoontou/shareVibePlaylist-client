import React, { useEffect } from 'react';

const Auth = () => {
  useEffect(() => {
    let body = JSON.parse(localStorage.getItem('userData'));
    console.log(body.id);
  });
  return <div>this is auth</div>;
};

export default Auth;
