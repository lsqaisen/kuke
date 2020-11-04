import { Application, Context } from 'https://deno.land/x/oak/mod.ts';
import {
  WebSocket,
  WebSocketServer,
} from 'https://deno.land/x/websocket@v0.0.5/mod.ts';

interface TModule {
  path: string;
  script_code: string;
  childs: TModule[];
}

const module: TModule = {
  path: '',
  script_code: '',
  childs: [],
};

const getModuleChilds = (path: string, parent: TModule): TModule[] => {
  const res = new TextDecoder('utf-8').decode(
    Deno.readFileSync(Deno.cwd() + path.replace(/^\.\//, '/'))
  );
  const pp = path.split('/');
  pp.pop();
  const m = res.match(/(?<!(\/\/.*))(import [^;]*)/g);
  if (!m) {
    return [];
  }
  const data = m.map((v) => {
    const p = v.replace(/.*['|"]([^'"]+)['|"]/g, `$1`);
    const _path = `${pp.join('/')}/${p.replace(/^\.\//, '')}`;
    const module: TModule = {
      path: _path,
      script_code: setScriptCode(_path),
      childs: [],
    };
    module.childs = getModuleChilds(_path, module);
    return module;
  }) as TModule[];
  return data;
};

const setScriptCode = (path: string) => {
  const code = `
  var script = document.createElement('script');
  script.type = 'text/babel';
  script.setAttribute('data-plugins', "transform-modules-umd")
  script.setAttribute('data-presets', "react")
  script.src = "${path}";
  document.querySelector('head').appendChild(script)
  `;
  return code;
};

const getScriptCodes = (module: TModule): string => {
  if (module.childs.length > 0) {
    return `${module.childs
      .map((v: TModule) => getScriptCodes(v))
      .join('\n')}\n${module.script_code}`;
  }
  return module.script_code;
};

const app = new Application();

app.use(async (ctx: Context) => {
  const decoder = new TextDecoder('utf-8');
  if (ctx.request.url.pathname == '/') {
    // 返回静态资源
    ctx.response.type = 'text/html';
    const data = Deno.readFileSync('./index.html');
    ctx.response.body = decoder.decode(data);
  }
  if (ctx.request.url.pathname.includes('/dist/bundle.js')) {
    module.path = './index.js';
    module.script_code = setScriptCode(module.path);
    module.childs = getModuleChilds('./index.js', module);
    ctx.response.type = 'application/javascript';
    let code = getScriptCodes(module);

    ctx.response.body = `Babel.disableScriptTags();\n${code};\nBabel.transformScriptTags();`;
  } else if (
    ['jsx', 'js', 'tsx', 'ts'].some((v) =>
      ctx.request.url.pathname.endsWith(`.${v}`)
    )
  ) {
    const p = Deno.cwd() + ctx.request.url.pathname;
    ctx.response.type = 'application/javascript';
    ctx.response.body = new TextDecoder('utf-8').decode(Deno.readFileSync(p));
  }
});

console.log('http://0.0.0.0:8000');
app.listen({ port: 8000 });

const wss = new WebSocketServer(8080);
wss.on('connection', async function(ws: WebSocket) {
  ws.on('message', async function(message: string) {
    console.log(message);
  });

  const watcher = Deno.watchFs('./src/');
  let timeout: number | null = null;
  for await (const event of watcher) {
    if (event.kind !== 'access') {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        ws.send(event.paths[0].replace(`${Deno.cwd()}`, '.'));
      }, 500);
    }
  }
});
