const express = require('express');
const router = express.Router();

const actions = require('../helpers/actionModel');

// console.log(actions);

// get all actions
router.get('/', (req, res) => {
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

// get action by id, receiving id from param
router.get('/:id', (req, res) => {
  const id = req.params.id;

  actions
    .get(id)
    .then(action => {
      if (!action) {
        res.status(404).json({
          success: false,
          message: 'No action with that id exists. Please try again.'
        });
      } else {
        res.status(200).json({
          success: true,
          action
        });
      }
    })

    .catch(err =>
      res.status(500).json({
        success: false,
        message: 'An error occurred while retrieving the actions'
      })
    );
});

// create a new user, requires name field
router.post('/', (req, res) => {
  const { project_id, description, notes } = req.body;
  const newAction = req.body;

  if (!project_id || !description || !notes) {
    res.status(400).json({
      success: false,
      message: 'Unable to create a new action, missing a required input'
    });
  }

  actions
    .insert(newAction)
    .then(action => {
      res.status(201).json({ success: true, action });
    })
    .catch(err =>
      res.status(500).json({
        success: false,
        message: 'An error occurred while creating the action'
      })
    );
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;

  actions
    .remove(id)
    .then(action => {
      if (!action) {
        res.status(404).json({
          success: false,
          message: 'No action with that id exists. Please try again.'
        });
      } else {
        res.status(200).json({
          success: true,
          message: 'Action successfully deleted.'
        });
      }
    })
    .catch(err =>
      res.status(500).json({
        success: false,
        message: 'An error occurred while creating the action'
      })
    );
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const updatedAction = req.body;

  if (!req.body) {
    res.status(400).json({
      success: false,
      message: 'Unable to update action action, missing body.'
    });
  }

  actions
    .update(id, updatedAction)
    .then(action => {
      if (!action) {
        res.status(404).json({
          success: false,
          message: 'No action with that id exists. Please try again.'
        });
      } else {
        res.status(201).json({
          success: true,
          message: 'Action successfully updated.',
          action
        });
      }
    })
    .catch(err =>
      res.status(500).json({
        success: false,
        message:
          'An error occurred while updating the action. An input may not match daba base structure or no matching user id. Please try again.'
      })
    );
});

module.exports = router;
