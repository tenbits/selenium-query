var tough = require('tough-cookie');
var Cookie = tough.Cookie;
var cookie = Cookie.parse(`A=B, D=C`);

console.log(cookie);