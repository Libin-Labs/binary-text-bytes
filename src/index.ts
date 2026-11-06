function strictText(value: string, max = 16384): void {
  if (typeof value !== 'string') throw new TypeError('Expected string');
  if (value.length > max) throw new RangeError('Text length budget exceeded');
}
function bytes(v: Uint8Array, max = 1048576): void {
  if (!(v instanceof Uint8Array)) throw new TypeError('Expected Uint8Array');
  if (v.length > max) throw new RangeError('Byte budget exceeded');
}
export function encodeBinary(input: Uint8Array): string {
  bytes(input);
  return Array.from(input, (v) => v.toString(2).padStart(8, '0')).join('');
}
export function decodeBinary(text: string): Uint8Array {
  strictText(text, 8388608);
  if (text.length % 8 || !/^[01]*$/.test(text))
    throw new RangeError('Canonical binary octets required');
  const out = new Uint8Array(text.length / 8);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(text.slice(i * 8, i * 8 + 8), 2);
  return out;
}
