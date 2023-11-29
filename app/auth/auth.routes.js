import express from 'express' // Ипморт Express
import { authUser, registerUser } from './auth.controller.js' //Ипорт контроллера AuthUser

const router = express.Router()

router.route('/login').post(authUser) //Route авторизации пользователя
router.route('/register').post(registerUser) //Route регистрации пользователя

export default router
