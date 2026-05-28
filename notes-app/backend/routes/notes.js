const express = require("express");

const router = express.Router();

const Note = require("../models/Note");


// ==========================
// CREATE NOTE
// ==========================

router.post("/", async (req, res) => {

    try {

        const note = new Note(req.body);

        const savedNote = await note.save();

        res.status(201).json(savedNote);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// ==========================
// GET ALL NOTES
// ==========================

router.get("/", async (req, res) => {

    try {

        const notes = await Note.find();

        res.json(notes);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// ==========================
// DELETE NOTE
// ==========================

router.delete("/:id", async (req, res) => {

    try {

        await Note.findByIdAndDelete(req.params.id);

        res.json({
            message: "Note Deleted"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


module.exports = router;