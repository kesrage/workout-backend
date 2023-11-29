import 'colors'
import dotenv from 'dotenv'
import express from 'express' // Иvgорт Express
import authRoutes from './app/auth/auth.routes.js' //Импорт AuthRoutes
import morgan from 'morgan'
import { prisma } from './app/prisma.js'
import { errorHandler, notFound } from './app/middleware/error.middleware.js'

dotenv.config() // Инициализация dotenv конфига

const app = express()

async function main() {
	if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

	app.use(express.json())
	app.use('/api/auth', authRoutes)

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
