import { Application, Context } from 'https://deno.land/x/oak/mod.ts';

const app = new Application();
app.use(async (ctx: Context) => {
  const decoder = new TextDecoder('utf-8');
  if (ctx.request.url.pathname == '/') {
    // 返回静态资源
    ctx.response.type = 'text/html';
    const data = Deno.readFileSync('./index.html');
    // const scripts = `<script type="module"/>
    // ${Object.entries(
    //   JSON.parse(decoder.decode(Deno.readFileSync('./importmap.json'))).imports
    // )
    //   .map(([k, v]) => `import "${v}";`)
    //   .join('\n')}
    // </script>`;
    ctx.response.body = decoder.decode(data);
  }
  console.log(1, ctx.request.url.pathname);
  if (ctx.request.url.pathname === '/socket.io/') {
    ctx.response.body = '';
  }
  if (
    ['jsx', 'js', 'tsx', 'ts', 'json'].some((v) =>
      ctx.request.url.pathname.endsWith(`.${v}`)
    )
  ) {
    // 处理 js 文件
    const p = Deno.cwd() + ctx.request.url.pathname;
    const res = Deno.readFileSync(p);
    ctx.response.type = 'application/javascript';
    ctx.response.body = decoder.decode(res);
  }
});

console.log('http://0.0.0.0:8000');
app.listen({ port: 8000 });
