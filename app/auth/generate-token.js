import jwt from 'jsonwebtoken'

//Берем подпись и указываем, что хотим прокинуть в тело запроса: Id пользователя, ключ шифрования, срок действия ключа.
export const generateToken = userId =>
	jwt.sign(
		{
			userId
		},
		process.env.JWT_SECRET,
		{
			expiresIn: '10d'
		}
	)
