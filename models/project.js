const mongoose = require('mongoose');
const Schema   = mongoose.Schema; 

// create the schema to store the projects
const projectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    stared: {
        type: Boolean,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Project = mongoose.model('project', projectSchema);

module.exports = Project;