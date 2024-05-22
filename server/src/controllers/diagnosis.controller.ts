import { prisma } from '../config/prisma'
import type { Request, Response } from 'express'

export const createRedirect = async (req: Request, res: Response) => {
    try {
        const result = await prisma.diagnosis.create({ data: req.body })
        return res.json({result})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 'error', message: 'Internal server error' })
    }
}