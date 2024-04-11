import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';

export default {
  input: 'grpc/services_grpc_pb.js',
  output: {
    file: 'services_grpc_pb.js',
    format: 'esm',
    sourcemap: false,
    compact: false,
    indent: true,
  },
  plugins: [
    nodeResolve(),
    json(),
    commonjs()
  ]
};
