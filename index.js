// play this: https://www.youtube.com/watch?v=d-diB65scQU

// code away!
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const actionsRouter = require('./data/routes/actionsRouter');
const projectsRouter = require('./data/routes/projectsRouter');

const actions = require('./data/helpers/actionModel');

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan('dev'));

server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectsRouter);

server.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'response working' });
});

server.get('/test', (req, res) => {
  console.log(actions);
  actions
    .get()
    .then(actions => res.status(200).json({ success: true, actions }))
    .catch(err =>
      res.status(500).json({
        success: false,
        message: 'Unable to retrieve actions. Please try again.'
      })
    );
});

server.listen(4000, () => {
  console.log('*** Listening on port 4000 ***');
});
