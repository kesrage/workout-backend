import express from 'express' // Ипморт Express
import { protect } from '../middleware/auth.middleware.js'
import { createNewExercise, getExercises } from './exersice.controller.js' //Импорт контроллера AuthUser

const router = express.Router()

router.route('/').post(protect, createNewExercise).get(protect, getExercises) //Route авторизации пользователя

export default router
