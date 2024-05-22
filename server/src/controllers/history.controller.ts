import { prisma } from '../config/prisma'
import type { Request, Response } from 'express'

interface AuthencatedRequest extends Request {
    user?: typeof prisma.user.fields
}

export const getAllHistories = async (req: Request, res: Response) => {
    try {
        const page: number = Number(req.query?.page) || 1
        const limit: number = Number(req.query?.limit) || 20
        const orderBy = req.query?.sorting as any || { createdAt: 'desc' }
        
        const [count,result] = await prisma.$transaction([
            prisma.history.count(),
            prisma.history.findMany({
                skip: (page-1)*limit,
                take: limit,
                select: {
                    createdAt: true,
                    diagnosis: true,
                    doctor: true,
                    doctorId: true,
                    patient: true,
                    id: true,
                    patientId: true,
                    status: true,
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

export const getHistoryByUserId = async (req: AuthencatedRequest, res: Response) => {
    try {
        let created = false
        let result: any
        const select = {
            createdAt: true,
            diagnosis: true,
            doctor: true,
            doctorId: true,
            patient: true,
            id: true,
            patientId: true,
            redirects: true,
            status: true,
        }

        result = await prisma.history.findFirst({ where: { patientId: +req.params.userId, status: { not: 'FINISH' }  }, select })
        
        if(!result) {
            result = await prisma.history.create({ data: { status: 'NEW', doctorId: +req.user?.id!, patientId: +req.params.userId }, select })
            created = true
        }

        return res.json({result: { ...result, created }})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 'error', message: 'Internal server error' })
    }
}