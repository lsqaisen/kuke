import { Application, Context } from 'https://deno.land/x/oak/mod.ts';
import {
  WebSocket,
  WebSocketServer,
} from 'https://deno.land/x/websocket@v0.0.5/mod.ts';

const wss = new WebSocketServer(8080);
wss.on('connection', async function(ws: WebSocket) {
  ws.on('message', async function(message: string) {
    console.log(message);
  });

  const watcher = Deno.watchFs('./src/');
  let timeout: number | null = null;
  for await (const event of watcher) {
    console.log(event);
    if (event.kind !== 'access') {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        ws.send(event.paths[0].replace(`${Deno.cwd()}`, '.'));
      }, 500);
    }
  }
});

const app = new Application();
app.use(async (ctx: Context) => {
  const decoder = new TextDecoder('utf-8');
  if (ctx.request.url.pathname == '/') {
    // 返回静态资源
    ctx.response.type = 'text/html';
    const data = Deno.readFileSync('./index.html');
    ctx.response.body = decoder.decode(data);
  }
  console.log(1, ctx.request.url.pathname);
  if (['jsx', 'js'].some((v) => ctx.request.url.pathname.endsWith(`.${v}`))) {
    // 处理 js 文件
    const p = Deno.cwd() + ctx.request.url.pathname;
    const res = Deno.readFileSync(p);
    ctx.response.type = 'application/javascript';
    ctx.response.body = decoder.decode(res);
  }
});

console.log('http://0.0.0.0:8000');
app.listen({ port: 8000 });
