import http from "k6/http";
import { check, sleep } from "k6";
import { ENV } from "../config/env.js";

export function login(user) {
  const url = `${ENV.baseUrl}Auth/login`;

  const payload = JSON.stringify({
    username: user.username,
    password: user.password,
  });

  const params = {
    headers: { 
      'Content-Type': 'application/json',
      'accept': '*/*'
    },
    tags: { workflow: "Login"},
  };

  const res = http.post(url, payload, params );

  // --- SAFE PARSING START ---
  let resBody = null;
  let token = null;
  if (res.status === 200 && res.body) {
    try {
      const bodyText = res.body.trim();
      token = bodyText.split(',')[0];

      resBody = res.json();
    } catch (e) { }
  }

  // const hasToken = resBody && 
  //   (resBody.token || 
  //    resBody.access_token || 
  //    (resBody.data && resBody.data.token) ||
  //    (resBody.result && resBody.result.token));

  check(res, {
    "login successful": (r) => r.status === 200,
    "token present": (r) => token && token.length > 50,
  });

  return token;

// return hasToken ? (resBody.token || resBody.access_token || 
//                     (resBody.data && resBody.data.token) || 
//                     (resBody.result && resBody.result.token)) : null;

}