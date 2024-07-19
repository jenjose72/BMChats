import express from 'express';
import {signup,login,logout} from '../controllers/auth.controller.js'

const router=express.Router();

router.post('/logout', logout)
router.post('/signup', signup)
router.post('/login', login)

export default router;