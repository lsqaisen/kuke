import {
  Router,
  Application,
  send,
  Context,
} from 'https://deno.land/x/oak/mod.ts';

const router = new Router();

const app = new Application();
app.use(async (ctx: Context, next: () => Promise<void>) => {
  // await send(ctx, ctx.request.url.pathname, {
  //   root: `${Deno.cwd()}/`,
  //   index: 'index.html',
  // });
  // await next();

  // ctx.response.body = Deno.readFileSync('./src/test.js');

  const decoder = new TextDecoder('utf-8');
  if (ctx.request.url.pathname == '/') {
    // 返回静态资源
    ctx.response.type = 'text/html';
    const data = Deno.readFileSync('./index.html');
    ctx.response.body = decoder.decode(data);
  }
  if (ctx.request.url.pathname.endsWith('.js')) {
    // 处理 js 文件
    const p = Deno.cwd() + ctx.request.url.pathname;
    const res = Deno.readFileSync(p);
    console.log(1, ctx.request.url.pathname, p);
    ctx.response.type = 'application/javascript';
    // 返回替换路径后的文件
    ctx.response.body = decoder.decode(res); // rewriteImports(decoder.decode(res));
  }
});

function rewriteImports(content: string) {
  return content.replace(/from ['|"]([^'"]+)['|"]/g, function($0, $1) {
    // 要访问 node_modules 里的文件
    console.log(2, $0, $1);
    if ($1[0] !== '.' && $1[1] !== '/') {
      return `from '/@cache/${$1}'`;
    } else {
      return $0;
    }
  });
}

const [maybeDiagnostics2, output2] = await Deno.bundle(
  'https://dev.jspm.io/react@16.13.1'
);
console.log(maybeDiagnostics2);

console.log('http://0.0.0.0:8000');
app.listen({ port: 8000 });
