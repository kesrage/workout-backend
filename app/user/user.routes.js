import express from 'express' // Ипморт Express
import { protect } from '../middleware/auth.middleware.js'
import { getUserProfile } from './user.controller.js' //Импорт контроллера AuthUser

const router = express.Router()

router.route('/profile').get(protect, getUserProfile) //Route авторизации пользователя

export default router
