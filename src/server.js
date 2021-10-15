import ws from 'ws';
import express from 'express';
import http from 'http';

//express 사용
const app = express();

//pug 사용 설정
app.set('view engine', 'pug');
//express에 template 위치 설정
app.set('views', __dirname + "/views");
//static 파일 사용 설정
app.use("/public",express.static(__dirname+"/public"));
// home.pug를 render해주는 거 설정
app.get("/", (req,res)=> res.render("home"));
app.get('/*', (req,res) => res.redirect('/'));


const handleListen = () => console.log(`Listening on http://localhost:3000`);

//http server
const server = http.createServer(app); // 서버가 listen 하기 전에 http 서버에 접근

//ws server
const wss = new ws.WebSocketServer({server});  // http , wss 를 같은 서버에 만드는 것

const handleConnection = (socket) => {
    console.log(socket);
}
wss.on("connection",handleConnection);

server.listen(3000, handleListen);
