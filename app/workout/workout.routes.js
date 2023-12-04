import express from 'express' // Ипморт Express
import { protect } from '../middleware/auth.middleware.js'
import {
	createNewWorkout,
	deleteWorkout,
	getWorkout,
	getWorkouts,
	updateWorkout
} from './workout.controller.js' //Импорт контроллера AuthUser

const router = express.Router()
router.route('/').post(protect, createNewWorkout).get(protect, getWorkouts)

router
	.route('/:id')
	.get(protect, getWorkout)
	.put(protect, updateWorkout)
	.delete(protect, deleteWorkout)

export default router
