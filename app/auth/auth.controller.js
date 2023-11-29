import { faker } from '@faker-js/faker'
import {hash} from 'argon2'
import asyncHandler from 'express-async-handler'

import { prisma } from '../prisma.js'
import { UserFields } from '../utils/user.utils.js'
import { generateToken } from './generate-token.js'

//@desc Auth user
//@route POST /api/users/login
//@access Public

export const authUser = asyncHandler(async (req, res) => {
	const user = await prisma.user.findMany({
		where: {
			password1: 'werf'
		}
	}) //Ищем всех наших юзеров

	res.json(user)
})

//@desc Register user
//@route POST /api/auth/register
//@access Public

export const registerUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	const isHaveUser = await prisma.user.findUnique({
		//Проверяем на существование текущий email
		where: {
			email
		}
	})

	if (isHaveUser) {
		res.status(400)
		throw new Error('User already exists')
	} //Если такой email существует отдаем ошибку 400 "Такой email существует"

	const user = await prisma.user.create({
		data: {
			email,
			password: await hash(password), 
			name: faker.person.fullName()
		},
		select: UserFields
	}) //Создаем юзера

	const token = generateToken(user.id)

	res.json({ user, token }) //Возвращаем Юзера и токен
})
