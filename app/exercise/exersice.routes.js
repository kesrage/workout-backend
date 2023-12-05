import express from 'express' // Ипморт Express
import { protect } from '../middleware/auth.middleware.js'
import {
	createNewExercise,
	deleteExercise,
	getExercises,
	updateExercise
} from './exersice.controller.js' //Импорт контроллера AuthUser
import { createNewExerciseLog } from './log/exercise-log.controller.js'

const router = express.Router()
router.route('/').post(protect, createNewExercise).get(protect, getExercises)

router
	.route('/:id')
	.put(protect, updateExercise)
	.delete(protect, deleteExercise)

router.route('/log/:exerciseId').post(protect, createNewExerciseLog)

export default router
