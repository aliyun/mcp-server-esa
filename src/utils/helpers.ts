export function log(...args: unknown[]) {
  const msg = `[DEBUG ${new Date().toISOString()}] ${args.join(' ')}\n`;
  process.stderr.write(msg);
}
