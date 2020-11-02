import {
  WebSocket,
  WebSocketServer,
} from 'https://deno.land/x/websocket@v0.0.5/mod.ts';
// import chokidarEvEmitter from 'https://jspm.dev/chokidar-socket-emitter';

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
const watcher = Deno.watchFs('./mod.ts');
for await (const event of watcher) {
  console.log('kill proceess');
  _porcess.close();
  console.log('restart');
  _porcess = run();
}
