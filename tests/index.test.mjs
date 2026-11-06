import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('wire fixture', () => {
  assert.equal(api.encodeBinary(new Uint8Array([0, 65, 255])), '000000000100000111111111');
});
test('decode fixture', () => {
  assert.deepEqual([...api.decodeBinary('000000000100000111111111')], [0, 65, 255]);
});
test('byte roundtrips', () => {
  for (let n = 0; n < 100; n++) {
    const v = Uint8Array.from({ length: n }, (_, i) => (i * 37 + n) % 256);
    assert.deepEqual(api.decodeBinary(api.encodeBinary(v)), v);
  }
});
test('invalid grammar', () => {
  assert.throws(() => api.decodeBinary('00000002'));
});
test('extra convention', () => {
  assert.equal(api.decodeBinary('').length, 0);
});
test('type contract', () => {
  assert.throws(() => api.encodeBinary([]));
  assert.throws(() => api.decodeBinary(1));
});
