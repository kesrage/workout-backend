import 'colors'
import dotenv from 'dotenv'
import express from 'express' // Импорт Express
import authRoutes from './app/auth/auth.routes.js' //Импорт AuthRoutes
import userRoutes from './app/user/user.routes.js'
import exerciseRoutes from './app/exercise/exersice.routes.js'


import path from 'path'
import morgan from 'morgan'
import { prisma } from './app/prisma.js'
import { errorHandler, notFound } from './app/middleware/error.middleware.js'

dotenv.config() // Инициализация dotenv конфига

const app = express()

async function main() {
	if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

	app.use(express.json())

	const __dirname = path.resolve()

	app.use('/uploads', express.static(path.join(__dirname, '/uploads/')))

	app.use('/api/auth', authRoutes)
	app.use('/api/users', userRoutes)
	app.use('/api/exercises', exerciseRoutes)

	app.use(notFound) //Вызываем middleware notFound
	app.use(errorHandler) //Вызываем middleware errorHandler

	const PORT = process.env.PORT || 5000 //Указание порта

	app.listen(
		PORT,
		console.log(
			`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.blue.bold
		)
	)
}

main()
	.then(async () => {
		await prisma.$disconnect() //Настраиваем отключение базы данных
	})
	.catch(async e => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
