import { prisma } from '../config/prisma'
import type { Request, Response } from 'express'

export const getUsers = async (req: Request, res: Response) => {
    try {
        const page: number = Number(req.query?.page) || 1
        const limit: number = Number(req.query?.limit) || 20
        const search: string = req.query?.search as string || ''
        const orderBy = req.query?.sorting as any || { createdAt: 'desc' }
        const where: any = {}

        if(search?.trim()) where.firstName = { contains: search, mode: "insensitive" }
        if(search?.trim()) where.lastName = { contains: search, mode: "insensitive" }
        if(Number(search?.trim())) where.id = Number(search?.trim())
        
        if(req.query?.role) where.role = req.query.role
        if(req.query?.speciality) where.speciality = req.query.speciality

        const [count,result] = await prisma.$transaction([
            prisma.user.count({where}),
            prisma.user.findMany({
                skip: (page-1)*limit,
                take: limit,
                where,
                select: {
                    address: true,
                    avatar: true,
                    createdAt: true,
                    dateOfBirth: true,
                    email: true,
                    firstName: true,
                    id: true,
                    lastName: true,
                    phone: true,
                    role: true,
                    roomNumber: true,
                    speciality: true,
                },
                orderBy,
            })
        ])
    
        return res.status(200).json({ result, count })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 'error', message: 'Internal server error' })
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const result = await prisma.user.create({ data: req.body })
        return res.json({result})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 'error', message: 'Internal server error' })
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const result = await prisma.user.update({ where: { id: +req.params.id }, data: req.body })
        return res.json({result})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 'error', message: 'Internal server error' })
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        await prisma.user.delete({ where: { id: +req.params.id } })
        return res.json(true)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 'error', message: 'Internal server error' })
    }
}