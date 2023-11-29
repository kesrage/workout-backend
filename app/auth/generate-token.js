import jwt from 'jsonwebtoken'

export const generateToken = userId =>
	jwt.sign(
		{
			userId
		},
		process.env.ACCESS_TOKEN,
		{
			expiresIn: '10d'
		}
	)

//Берем подпись и указываем, что хотим прокинуть в тело запроса: Id пользователя, ключ шифрования, срок действия ключа.
