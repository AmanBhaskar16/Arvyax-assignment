import express from 'express';
import auth from '../middlewares/auth.js';
import {
  getPublicSessions,
  getMySessions,
  getSessionById,
  saveDraft,
  publishSession
} from '../controllers/sessionController.js';

const router = express.Router();
// Get all public session route
router.get('/sessions', getPublicSessions);
// Get my-sessions route
router.get('/my-sessions', auth, getMySessions);
// Get particular session from my-session route for editing
router.get('/my-sessions/:id', auth, getSessionById);
// Route to save a drafted session
router.post('/my-sessions/save-draft', auth, saveDraft);
// Route for publishing a drafted session
router.post('/my-sessions/publish', auth, publishSession);

export default router;