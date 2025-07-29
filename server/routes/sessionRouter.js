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

router.get('/sessions', getPublicSessions);
router.get('/my-sessions', auth, getMySessions);
router.get('/my-sessions/:id', auth, getSessionById);
router.post('/my-sessions/save-draft', auth, saveDraft);
router.post('/my-sessions/publish', auth, publishSession);

export default router;