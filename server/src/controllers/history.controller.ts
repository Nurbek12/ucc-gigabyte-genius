import { prisma } from '../config/prisma'
import type { Request, Response } from 'express'

interface AuthencatedRequest extends Request {
    user?: {
        id: number
        name: string
        phone: string
        role: "ADMIN" | "DOCTOR" | "PATIENT"
    }
}

export const select = {
    createdAt: true,
    diagnosis: true,
    doctorId: true,
    patient: {
        select: {
            id: true,
            phone: true,
            dateOfBirth: true,
            lastName: true,
            firstName: true,
        }
    },
    id: true,
    patientId: true,
    redirects: {
        select: {
            doctor: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    roomNumber: true,
                    phone: true,
                    speciality: true
                }
            },
            createdAt: true,
            description: true,
            doctorId: true,
            files: true,
            fromDoctor: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    roomNumber: true,
                    phone: true,
                    speciality: true
                }
            },
            fromDoctorId: true,
            historyId: true,
            id: true,
            title: true,
        }
    },
    status: true,
}

export const getAllHistories = async (req: AuthencatedRequest, res: Response) => {
    try {
        const page: number = Number(req.query?.page) || 1
        const limit: number = Number(req.query?.limit) || 20
        const orderBy = req.query?.sorting as any || { createdAt: 'desc' }
        const where: { patientId?: number, doctorId?: number } = {}
        
        if(req.user?.role === 'DOCTOR') where.doctorId = req.user.id
        if(req.user?.role === 'PATIENT') where.patientId = req.user.id
        // console.log(where)

        const [count,result] = await prisma.$transaction([
            prisma.history.count({where}),
            prisma.history.findMany({
                skip: (page-1)*limit,
                take: limit,
                where,
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
        let result: any

        result = await prisma.history.findFirst({ where: { patientId: +req.params.id, status: { not: 'FINISH' }  }, select })
        
        if(!result && req.user?.role === 'PATIENT') return res.status(200).json({ result: null }) 
        if(!result) result = await prisma.history.create({ data: { status: 'NEW', doctorId: +req.user?.id!, patientId: +req.params.id }, select })

        return res.json({result})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 'error', message: 'Internal server error' })
    }
}

export const getHistoryById = async (req: AuthencatedRequest, res: Response) => {
    try {
        const result = await prisma.history.findFirst({ where: { id: +req.params.id }, select })
        return res.json({result})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 'error', message: 'Internal server error' })
    }
}