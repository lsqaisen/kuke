const run = () => {
  return Deno.run({
    cmd: ['deno', 'run', '-A', '--unstable', 'mod.ts'],
  });
};
let _porcess = run();
let timeout: number | null = null;
const watcher = Deno.watchFs(['./mod.ts', './index.js']);
for await (const event of watcher) {
  console.log('kill proceess');
  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(() => {
    _porcess.close();
    console.log('restart');
    _porcess = run();
  }, 500);
}
