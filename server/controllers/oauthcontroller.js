// const fetch = require('node-fetch');

// const oauthcontroller = {};

// const clientId = "42c01af939954a35a024a9d4aee4b125"; // Replace with your client id
// const params = new URLSearchParams(window.location.search)
// const code = params.get("code")

// oauthcontroller.start = async (req, res, next) => {
  
//   if (!code) {
//     oauthcontroller.redirectToAuthCodeFlow(clientId);
//   } else {
//     // const accessToken = await oauthcontroller.getAccessToken(clientId, code);
//     // const profile = await oauthcontroller.fetchProfile(accessToken); //don't know if we'll do this
//   }

//   return next();
// }

// oauthcontroller.redirectToAuthCodeFlow = async function(clientId) {
//   const verifier = generateCodeVerifier(128);
//   const challenge = await generateCodeChallenge(verifier);

//   localStorage.setItem("verifier", verifier);

//   const params = new URLSearchParams();
//   params.append("client_id", clientId);
//   params.append("response_type", "code");
//   params.append("redirect_uri", "http://localhost:8080/api/callback");
//   params.append("scope", "user-read-private user-read-email playlist-modify-public playlist-modify-private");
//   params.append("code_challenge_method", "S256");
//   params.append("code_challenge", challenge);

//   document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
// }

// function generateCodeVerifier(length) {
//   let text = '';
//   let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

//   for (let i = 0; i < length; i++) {
//       text += possible.charAt(Math.floor(Math.random() * possible.length));
//   }
//   return text;
// }

// async function generateCodeChallenge(codeVerifier) {
//   const data = new TextEncoder().encode(codeVerifier);
//   const digest = await window.crypto.subtle.digest('SHA-256', data);
//   return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
//       .replace(/\+/g, '-')
//       .replace(/\//g, '_')
//       .replace(/=+$/, '');
// }

// oauthcontroller.getAccessToken = async function(clientId, code) {
//   // TODO: Get access token for code
//   const verifier = localStorage.getItem("verifier");

//     const params = new URLSearchParams();
//     params.append("client_id", clientId);
//     params.append("grant_type", "authorization_code");
//     params.append("code", code);
//     params.append("redirect_uri", "http://localhost:5173/callback");
//     params.append("code_verifier", verifier);

//     const result = await fetch("https://accounts.spotify.com/api/token", {
//         method: "POST",
//         headers: { "Content-Type": "application/x-www-form-urlencoded" },
//         body: params
//     });

//     const { access_token } = await result.json();
//     return access_token;
// }

// oauthcontroller.fetchProfile = async function(token) {
//   // TODO: Call Web API
// }


// module.exports = oauthcontroller;

//ClientID: '42c01af939954a35a024a9d4aee4b125'
//Redirect_URI: 'http://localhost:8080/api/callback'
//Scope: 'user-read-private user-read-email playlist-modify-public playlist-modify-private'