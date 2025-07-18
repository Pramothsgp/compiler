const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
rl.on('line', (line) => {
  const n = parseInt(line);
  let a = 0, b = 1;
  for(let i = 0; i < n; i++) {
    process.stdout.write(a + ' ');
    [a, b] = [b, a + b];
  }
  rl.close();
});