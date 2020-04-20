const http = require('http');

const parseCookie = (cookie = '') => 
  cookie
    .split(';')
    .map(v => v.split('='))
    .map(([k, ...vs]) => [k, vs.join('=')])
    .reduce((acc, [k, v]) => {
        acc[k.trim()] = decodeURIComponent(v);
        return acc;
    }, {});


http.createServer((req, res) => {
    const cookies = parseCookie(req.headers.cookie);
    console.log(req.url, cookies);
    res.writeHead(200, { 'Set-Cookie': 'myCookie=test;cookie2=testCookie'});
    res.end('Hello World');
})
    .listen(8082, () => console.log("8082번호 포트가 열렸습니다"));
    