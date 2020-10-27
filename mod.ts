import { Application, Context } from 'https://deno.land/x/oak/mod.ts';
import {
  WebSocket,
  WebSocketServer,
} from 'https://deno.land/x/websocket@v0.0.5/mod.ts';

const wss = new WebSocketServer(8080);
wss.on('connection', function(ws: WebSocket) {
  ws.on('message', function(message: string) {
    console.log(message);
  });

  setTimeout(() => {
    const res = Deno.readFileSync('./src/preact.js');
    const js = new TextDecoder('utf-8').decode(res);
    ws.send(js.replace('World', 'Aisen'));
  }, 5000);
});

const app = new Application();
app.use(async (ctx: Context, next: () => Promise<void>) => {
  const decoder = new TextDecoder('utf-8');
  if (ctx.request.url.pathname == '/') {
    // 返回静态资源
    ctx.response.type = 'text/html';
    const data = Deno.readFileSync('./index.html');
    ctx.response.body = decoder.decode(data);
  }
  if (['jsx', 'js'].some((v) => ctx.request.url.pathname.endsWith(`.${v}`))) {
    // 处理 js 文件
    const p = Deno.cwd() + ctx.request.url.pathname;
    const res = Deno.readFileSync(p);
    console.log(1, ctx.request.url.pathname, p);
    ctx.response.type = 'application/javascript';
    // 返回替换路径后的文件
    ctx.response.body = decoder.decode(res); // rewriteImports(decoder.decode(res));
  }
});

console.log('http://0.0.0.0:8000');
app.listen({ port: 8000 });
