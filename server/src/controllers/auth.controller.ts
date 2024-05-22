import jwt from 'jsonwebtoken'
import { prisma } from '../config/prisma'
import { Request, Response } from 'express'
import { SECRET } from '../config/variables'

export const login = async (req: Request, res: Response) => {
    try {
        const user = await prisma.user.findFirst({
            where: { phone: req.body.phone },
            select: {
                firstName: true,
                lastName: true,
                id: true,
                phone: true,
                password: true,
                role: true
            }
        })
        if(!user || user?.password !== req.body.password) return res.status(403).json({ status: 'warning', message: 'Телефон или Пароль неверный!' })

        const { password, ...other } = user
        const payload = { id: user.id, name: user.firstName + ' ' + user.lastName, phone: user.phone, role: user.role }

        const token = jwt.sign(payload, SECRET!, { expiresIn: '12h' })
        return res.status(200).json({ token, user: other })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 'error', message: 'Internal server error' })
    }
}