import express from 'express' // Ипморт Express
import { protect } from '../middleware/auth.middleware.js'
import {
	createNewExercise,
	deleteExercise,
	getExercises,
	updateExercise
} from './exersice.controller.js' //Импорт контроллера AuthUser

const router = express.Router()
router.route('/').post(protect, createNewExercise).get(protect, getExercises)

router.route('/:id').put(protect, updateExercise).delete(protect, deleteExercise)

export default router
