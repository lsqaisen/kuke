import {
  WebSocket,
  WebSocketServer,
} from 'https://deno.land/x/websocket@v0.0.5/mod.ts';

const run = () => {
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
  const _porcess = Deno.run({
    cmd: ['deno', 'run', '-A', '--unstable', 'mod.ts'],
  });
  return {
    close: () => {
      _porcess.close();
      wss.close();
    },
  };
};
let _porcess = run();
let timeout: number | null = null;
const watcher = Deno.watchFs(['./mod.ts', './index.js']);
for await (const event of watcher) {
  console.log('kill proceess');
  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(() => {
    _porcess.close();
  }, 500);
  console.log('restart');
  _porcess = run();
}
