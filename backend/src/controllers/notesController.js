import Note from "../models/Note.js"

export const getALlNotes = async (req,res) => {
    try {
        const notes = await Note.find().sort({createdAt: -1});
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error in getAllNotes controller", error);
        res.status(500).json({message : "Internal server error"});
    }
}

export async function getNoteByID(req,res){
    try {
        const note = await Note.findById(req.params.id);
        if(!note) return res.status(404).json({message : "note not found"});
        res.status(200).json(note);
    } catch (error) {
        console.error("Error in getNoteById controller", error);
        res.status(500).json({message : "Internal server error"});
    }
}

export async function createNote(req,res){
    try {
        const {title, content} = req.body;
        const note = new Note({title: title, content : content});

       const savedNote = await note.save();
        res.status(201).json(savedNote);
    } catch (error) {
        console.error("Error in createNote controller", error);
        res.status(500).json({message : "Internal server error"});
    }
}

export async function updateNote(req,res){
   try {
        const {title, content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title, content}, {new: true});

        if(!updatedNote) return res.status(404).json({message : "note not found"});

        res.status(200).json({
            message : "note updated successfully ✅",
            note :updatedNote
        });
   } catch (error) {
       console.error("Error in updateNote controller", error);
       res.status(500).json({message : "Internal server error"});
   }
}

export async function deleteNote(req,res){
    
   try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if(!deletedNote) return res.status(404).json({message : "note not found"});
        res.json({
            message :"note deleetd successfully ✅",
            note : deletedNote
        })
   } catch (error) {
        console.error("Error in deleteNote controller", error);
        res.status(500).json({message : "Internal server error"});
   } 
}

// const express = require("express");

// export async function createNote(req,res){
//     try {
//         const {title, content} = req.body;
//         const newNote = new Note({title: title, content : content});

//         await newNote.save();
//         res.status(201).json({message : "note created successfully"});
//     } catch (error) {
//         console.error("Error in createNote controller", error);
//         res.status(500).json({message : "Internal server error"});
//     }
// }