import express from 'express';
import Note from '../controllers/note.controller.js';
import protect from '../middleware/auth.js';
const router = express.Router();

router.route('/all').get(protect, async(req, res) => {
  const result = Note.getNotes();
  result.then(data => {
      res.json({success: data});
  }).catch(err => console.log(err))
});

router.route('/create').post(protect, async(req, res) => {
  const { title, description } = req.body;
  console.log(title, description);
  const result = Note.create(title, description);
  result.then(data => {
      console.log(`Note created with ID: ${data.id}`); 
      res.json({success: data});
  }).catch(err => console.log(err))
}
);
router.route('/update/:id').put(protect, async(req, res) => {
  const noteId = req.params.id;
  const { title, description } = req.body;
  const result = Note.updateNoteById(noteId, title, description);
  result.then(data => {
      res.json({success: data});
  }).catch(err => console.log(err))
});
router.route('/delete/:id').delete(protect, async(req, res) => {
  const noteId = req.params.id;
  const result = Note.deleteNoteById(noteId);
  result.then(data => {
      res.json({success: data});
  }).catch(err => console.log(err))
});

router.route('/read/:id').get(protect, async(req, res) => {
  const noteId = req.params.id;
  const result = Note.getNoteById(noteId);
  result.then(data => {
      res.json({success: data});
  }).catch(err => console.log(err))
});


export default router;