const path = require('path');
const fs = require('fs');

// Project schema, used to save projects to mongoDB
const Project = require('../models/project');

// Multer - used to upload images to the server's storage
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname + '/../public/images/project-cards'));
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage }).single('image');

// CONTROLLERS
const projectsIndex = (req, res) => {
    Project.find()
    .then((projects) => {

        projects.reverse();

        // find the first project with a star
        let highlight = null;
        projects.forEach((item, index) => {
            if (highlight == null && item.stared == true) {
                highlight = item;
            }
        });

        // if no stared project is found just use the first one
        if (highlight == null) {
            highlight = projects[0];
        }

        res.render('projects/projects', 
        { 
            admin: (res.locals.user != null),
            projects,
            highlight
        });

    })
    .catch((err) => { console.log(err); })
}

const projectsCreateGet = (req, res) => {
    res.render('projects/projects-create', {admin: (res.locals.user != null)})
}

const projectsCreatePost = (req, res) => {
    // Upload the image to the server
    upload(req, res, function(err) {
        // Catch errors
        if (!req.file)          { return res.send('Please select an image to upload'); }
        else if (err)           { return res.send(err); }

        // Save the project to mongoDB
        const imagePath = path.join(
            '/images/project-cards/' + 
            path.basename(req.file.path)
        );
        
        const project = new Project({
            title:    req.body.title,
            stared:   req.body.stared == 'on',
            category: req.body.category.toLowerCase(),
            content:  req.body.content,
            url:      req.body.url,
            image:    imagePath,
        });

        project.save()
        .then(() => {
            return res.redirect('/portfolio');
        })
        .catch((err) => { console.log(err); });
    });
}

const projectsEditGet = (req, res) => {
    const id = req.params.id;

    Project.findById(id)
    .then((result) => {
        res.render('projects/projects-edit', {
            admin:    (res.locals.user != null),
            title:    result.title,
            stared:   result.stared,
            category: result.category,
            content:  result.content,
            url:      result.url,
            image:    result.image,
            id:       id
        });

    })
    .catch((err) => { console.log(err); });
}

const projectsEditPost = (req, res) => {
    const id = req.params.id;

    upload(req, res, function(err) {
        if (err)           { return res.send(err); }

        Project.findById(id)
        .then((result) => { 

            let oldImage = null;

            // create the new values for the project's schema
            let data = {
                title:    req.body.title,
                stared:   req.body.stared == 'on',
                category: req.body.category.toLowerCase(),
                content:  req.body.content,
                url:      req.body.url,
            }

            // check to see if an image was uploaded
            if (req.file) {
                // Save the project to mongoDB
                const imagePath = path.join(
                    '/images/project-cards/' + 
                    path.basename(req.file.path)
                );

                data.image = imagePath;
                oldImage = result.image;
            }

            // update the project's schema
            Project.findByIdAndUpdate(id, data)
            .then(() => {
                // delete the old image if a new one was provided
                if (oldImage != null) {
                    fs.unlinkSync(path.join(__dirname + '/../public' + oldImage));
                }

                res.redirect('/portfolio');

            })
            .catch((err) => { console.log(err); });
        })
        .catch((err) => { console.log(err); });
    });
}

const projectsDelete = (req, res) => {
    const id = req.params.id;

    // delete the post's image
    Project.findById(id)
    .then((result) => { 

        fs.unlinkSync(path.join(__dirname + '/../public' + result.image));  

        // delete the post from the database
        Project.findByIdAndDelete(id)
        .then(() =>     { res.redirect('/portfolio'); })
        .catch((err) => { console.log(err); });

    })
    .catch((err) =>   { console.log(err); })
}

module.exports = {
    projectsIndex,
    projectsCreateGet,
    projectsCreatePost,
    projectsEditGet,
    projectsEditPost,
    projectsDelete
}