/* eslint-disable */
const fs = require('fs');
const path = require('path');

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const DEFAULT_PORT = 5000;
const UPDATE_JSON_FILE = path.join(__dirname, './src/notes.json');
const fileContents = fs.readFileSync('./src/notes.json', 'utf8');

const OK = 200;
const SERVER_ERROR = 500;
const BUFFER_SIZE = 0;

const UPDATE_JSON_ENDPOINT = '/api/update_json';
const READ_JSON_ENDPOINT = '/api/read_json';
const server = express();
const hostName = 'localhost';
server.use(cors());
server.options('*', cors());

const rawParser = bodyParser.raw({ type: '*/*' });
server.post(UPDATE_JSON_ENDPOINT, rawParser, (req, res) => {
  const data = req.body instanceof Buffer ? req.body : Buffer.alloc(BUFFER_SIZE);
  fs.writeFile(UPDATE_JSON_FILE, data, err => {
    if (!err) {
      console.log(`Wrote ${Buffer.byteLength(data)} bytes`);
      res.status(OK).send('Success!');
    } else {
      console.log(err.toString());
      res.status(SERVER_ERROR).send(err.toString());
    }
  });
});

server.get(READ_JSON_ENDPOINT, (req, res) => {
  res.status(OK).send(JSON.parse(fileContents));
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
  fs.readFile(UPDATE_JSON_FILE, err => {
    if (!err) {
      res.status(OK).send('Success');
    } else {
      res.status(SERVER_ERROR).send(err.toString());
    }
  });
});

const port = process.env.PORT || DEFAULT_PORT;
console.log(`Listening on port ${port}`);
server.listen(port, hostName);
