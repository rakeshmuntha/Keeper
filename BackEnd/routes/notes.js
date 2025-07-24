const express = require('express')
const router = express.Router();
const fetchuser = require('../middlewares/fetchuser');
const Notes = require('../modules/Notes')
const { body, validationResult } = require('express-validator');


// ROUTE 1: Get all the notes using: GET /api/notes/fetchallnotes !Login REQuired
router.get('/lastModified', fetchuser, async (req, res) => {
    const notes = await Notes.find({ user: req.user.id });

    if (notes.length === 0) return res.json({ lastModified: null });
    return res.json({ lastModified: notes[notes.length - 1].updatedAt });
});

// ROUTE 1: Get all the notes using: GET /api/notes/fetchallnotes !Login REQuired
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send('Internal Server Error')
    }
})


// ROUTE 2: Add a new notes using: POST /api/notes/addnote !Login REQuired
router.post("/addnote", [
    body('title', 'Enter a valid Title').isLength({ min: 1 }),
    body('description', 'Description must be Atleast 1 characters').isLength({ min: 1 }),
    body('tag'),
], fetchuser, async (req, res) => {

    try {
        const { title, description, tag } = req.body;

        const errors = validationResult(req);
        // if there are any errors return the error
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        // we are creating a promise
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        // note.save returns the notes 
        const savednote = await note.save();
        res.json(savednote);
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send('Internal Server Error')
    }
})


// ROUTE 3: Update a existing notes using: PUT /api/notes/updatenote/:id !Login REQuired
router.put("/updatenote/:id", fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        // Create a new Note Object

        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };
        // Not giving functionality to add date

        // Find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if (!note) return res.status(404).send('Not found');

        if (note.user.toString() !== req.user.id) return res.status(401).send('Not Allowed');

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })

        res.json(note);
    }

    catch (error) {
        console.error(error.message)
        res.status(500).send('Internal Server Error')
    }
})


// ROUTE 4: Delete a existing notes using: DELETE /api/notes/deletenote/:id !Login REQuired
router.delete("/deletenote/:id", fetchuser, async (req, res) => {

    try {
        // Find the note to be deleted and delete it
        let note = await Notes.findById(req.params.id);
        if (!note) return res.status(404).send('Not found');

        // Allow deletetion if user owns this note
        if (note.user.toString() !== req.user.id) return res.status(401).send('Not Allowed');

        note = await Notes.findByIdAndDelete(req.params.id)

        res.json({ "Success": "This Note has been Deleted", note: note });
    }

    catch (error) {
        console.error(error.message)
        res.status(500).send('Internal Server Error')
    }
})

module.exports = router;