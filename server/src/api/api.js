'use strict';

import express from 'express';

import notFound from './../middleware/404.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.write('ldskjf');
  res.end();
});

let sendJSON = (res, data) => {
  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(data));
  res.end();
};

export default router;