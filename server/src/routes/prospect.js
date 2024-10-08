import express from 'express';
import { addProspect, getProspects, getProspectPosts, deleteProspect } from '../controllers/prospectController.js';
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post('/add', addProspect);
router.get('/list', getProspects);
router.get('/posts', getProspectPosts);
router.delete('/delete/:prospectId', deleteProspect);

export default router;