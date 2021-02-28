const express = require('express');
const projectControllers = require('../controllers/projectControllers');

const { requireAuth, checkUser } = require('../middleware/authMiddleware');

const router = express.Router();

router.get    ('/', checkUser,             projectControllers.projectsIndex);                      // get projects index page
router.get    ('/create', checkUser, requireAuth, projectControllers.projectsCreateGet);           // get create project page
router.post   ('/create', checkUser, requireAuth, projectControllers.projectsCreatePost);          // post a project
router.get    ('/:id', checkUser, requireAuth, projectControllers.projectsEditGet);                // get editable project page
router.post   ('/:id', checkUser, requireAuth, projectControllers.projectsEditPost);               // post a edited project
router.delete ('/:id', checkUser, requireAuth, projectControllers.projectsDelete);                 // delete a project

module.exports = router;