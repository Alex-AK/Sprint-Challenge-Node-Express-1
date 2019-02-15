const express = require('express');
const router = express.Router();

const projects = require('../helpers/projectModel');

// get all projects
router.get('/', (req, res) => {
  console.log(projects);
  projects
    .get()
    .then(projects => res.status(200).json({ success: true, projects }))
    .catch(err =>
      res.status(500).json({
        success: false,
        message: 'Unable to retrieve projects. Please try again.'
      })
    );
});

// get project by id, receiving id from param
router.get('/:id', (req, res) => {
  const id = req.params.id;

  projects
    .get(id)
    .then(project => {
      if (!project) {
        res.status(404).json({
          success: false,
          message: 'No project with that id exists. Please try again.'
        });
      } else {
        res.status(200).json({
          success: true,
          project
        });
      }
    })

    .catch(err =>
      res.status(500).json({
        success: false,
        message: 'An error occurred while retrieving the projects'
      })
    );
});

// create a new user, requires name field
router.post('/', (req, res) => {
  const { name, description } = req.body;
  const newProject = req.body;

  if (!name || !description) {
    res.status(400).json({
      success: false,
      message: 'Unable to create a new project, missing a required input'
    });
  }

  projects
    .insert(newProject)
    .then(project => {
      res.status(201).json({ success: true, project });
    })
    .catch(err =>
      res.status(500).json({
        success: false,
        message: 'An error occurred while creating the project'
      })
    );
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;

  projects
    .remove(id)
    .then(project => {
      if (!project) {
        res.status(404).json({
          success: false,
          message: 'No project with that id exists. Please try again.'
        });
      } else {
        res.status(200).json({
          success: true,
          message: 'project successfully deleted.'
        });
      }
    })
    .catch(err =>
      res.status(500).json({
        success: false,
        message: 'An error occurred while creating the project'
      })
    );
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const updatedProject = req.body;

  if (!req.body) {
    res.status(400).json({
      success: false,
      message: 'Unable to update project, missing body.'
    });
  }

  projects
    .update(id, updatedProject)
    .then(project => {
      if (!project) {
        res.status(404).json({
          success: false,
          message: 'No project with that id exists. Please try again.'
        });
      } else {
        res.status(201).json({
          success: true,
          message: 'Project successfully updated.',
          project
        });
      }
    })
    .catch(err =>
      res.status(500).json({
        success: false,
        message:
          'An error occurred while updating the project. An input may not match daba base structure or no matching user id. Please try again.'
      })
    );
});

module.exports = router;
