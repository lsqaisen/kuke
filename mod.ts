import { Application, Context } from 'https://deno.land/x/oak/mod.ts';

const app = new Application();
app.use(async (ctx: Context) => {
  const decoder = new TextDecoder('utf-8');
  if (ctx.request.url.pathname == '/') {
    // 返回静态资源
    ctx.response.type = 'text/html';
    const data = Deno.readFileSync('./index.html');
    ctx.response.body = decoder.decode(data);
  }
  if (
    ['jsx', 'js', 'tsx', 'ts', 'json'].some((v) =>
      ctx.request.url.pathname.endsWith(`.${v}`)
    )
  ) {
    // 处理 js 文件
    const p = Deno.cwd() + ctx.request.url.pathname;
    ctx.response.type = 'application/javascript';
    ctx.response.body = loadFile(p);
  }
});

const loadFile = (url: string, _imports?: string[]): string => {
  const res = new TextDecoder('utf-8').decode(Deno.readFileSync(url));
  _imports = _imports || [];
  return res.replace(/import .* from ['|"]([^'"]+)['|"]/g, function($0, $1) {
    console.log($0, $1);
    if ($1[0] !== '.' && $1[1] !== '/') {
      if (_imports?.includes($1)) {
        return '';
      } else {
        _imports?.push($1);
      }
      return $0;
    } else {
      const p = url.split('/');
      p.pop();
      return `\n${loadFile(`${p.join('/')}/${$1}`, _imports).replace(
        /\nexport default .*/,
        ''
      )}\n`;
    }
  });
};

console.log('http://0.0.0.0:8000');
app.listen({ port: 8000 });
