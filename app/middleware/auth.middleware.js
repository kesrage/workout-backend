import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import { prisma } from '../prisma.js'
import { UserFields } from '../utils/user.utils.js'

export const protect = asyncHandler(async (req, res, next) => {
	let token //Переменная для хранения JWT токена

	if (req.headers.authorization?.startsWith('Bearer')) {
		//Проверка наличия заголовка autorization в запросе и начинается ли он с Bearer
		token = req.headers.authorization.split(' ')[1] //Если true, извлекается токен из заголовка

      

		const decoded = jwt.verify(token, process.env.JWT_SECRET) //Декодирование токена с использованием секретного ключа и сохранения в переменную decoded

		const userFound = await prisma.user.findUnique({
			//Поиск пользователя в базе данных с использованием prisma. В данном случае, ищется пользователь с ID, полученным из декодированного токена.
			where: {
				id: decoded.userId
			},
			select: UserFields
		})

		//Если пользователь найден, он добавляется в объект запроса (req.user), и управление передается следующему middleware в цепочке.
		if (userFound) {
			req.user = userFound
			next()
		} else {
			// Если пользователя не найдено, возвращается статус 401 (Не авторизован), и выбрасывается ошибка "Not authorized, token failed".
			res.status(401)
			throw new Error('Not authorized, token failed')
		}
	}

	// Если токен не был найден (не начинается с 'Bearer'), возвращается статус 401 (Не авторизован), и выбрасывается ошибка
	if (!token) {
		res.status(401)
		throw new Error('Not authorized, I do not have a token')
	}
})
