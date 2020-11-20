const path = require('path');
const shell = require('shelljs');
const rimraf = require('rimraf');

// https://github.com/shelljs/shelljs/issues/469
process.env.PATH += (path.delimiter + path.join(process.cwd(), 'node_modules', '.bin'));

const PROTO_DIR = path.join(__dirname, '../protos');
const MODEL_DIR = path.join(__dirname, '../models');
const PROTOC_GEN_TS_PATH = path.join(__dirname, '../node_modules/.bin/protoc-gen-ts');

rimraf.sync(`${MODEL_DIR}/*`);

const protoConfig = [
  `--plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" `,
  `--grpc_out="grpc_js:${MODEL_DIR}" `,
  `--js_out="import_style=commonjs,binary:${MODEL_DIR}" `,
  `--ts_out="grpc_js:${MODEL_DIR}" `,
  `--proto_path ${PROTO_DIR} ${PROTO_DIR}/*.proto`
];

// https://github.com/agreatfool/grpc_tools_node_protoc_ts/tree/master/examples
shell.exec(`grpc_tools_node_protoc ${protoConfig.join(' ')}`);

// https://github.com/dcodeIO/protobuf.js#command-line
// https://github.com/dcodeIO/protobuf.js#command-line-api
