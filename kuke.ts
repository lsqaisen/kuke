const run = () => {
  return Deno.run({
    cmd: ['deno', 'run', '-A', '--unstable', 'mod.ts'],
  });
};
let _porcess = run();
const watcher = Deno.watchFs('./mod.ts');
for await (const event of watcher) {
  console.log('kill proceess');
  _porcess.close();
  console.log('restart');
  _porcess = run();
}
