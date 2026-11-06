import { encodeBinary, decodeBinary } from '@lp-labs/binary-text-bytes';
const bytes = new Uint8Array([0, 65, 255]);
if (decodeBinary(encodeBinary(bytes))[0] !== bytes[0]) throw new Error('Codec');
// @ts-expect-error invalid argument must be rejected by declarations
encodeBinary([1]);
