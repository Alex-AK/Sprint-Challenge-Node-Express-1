const express = require('express');
const router = express.Router();

const projects = require('../helpers/projectModel');

router.get('/', (req, res) => {
  // const id = req.params.id;
  projects
    .get()
    .then(projects => res.status(200).json({ success: true, projects }))
    .catch(err =>
      res.status(500).json({
        success: false,
        message: 'Unable to retrieve actions. Please try again.'
      })
    );
});

router.get('/', (req, res) => {});

router.delete('/', (req, res) => {});

router.put('/', (req, res) => {});

router.post('/', (req, res) => {});

module.exports = router;
