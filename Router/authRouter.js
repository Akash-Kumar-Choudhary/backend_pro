import express from 'express'

import { loginController , registerController, singleAuthController, testController } from '../Contoller/authController.js'
import { Admin, requiresignIn } from '../Middleware/authMiddleware.js'

const router = new express.Router()

router.post('/login' , loginController)
router.post('/register' , registerController)
router.get('/single-data/:id' , singleAuthController)
router.get('/test' , requiresignIn , Admin, testController)
export default router