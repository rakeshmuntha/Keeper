const mongoose = require('mongoose');
import mongoose from 'mongoose';
const { Schema } = mongoose;

const notesSchema = new Schema({

    type: { type: String, required: true },
    description: { type: String, required: true },
    tag: { type: String, default: "General"},
    date: { type: Date, default: Date.now },
    
});
module.exports = mongoose.model('notes', notesSchema);