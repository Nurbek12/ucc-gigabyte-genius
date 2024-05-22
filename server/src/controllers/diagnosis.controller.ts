import { prisma } from '../config/prisma'
import type { Request, Response } from 'express'

export const createDiagnosis = async (req: Request, res: Response) => {
    try {
        await prisma.history.update({ where: { id: +req.body.historyId }, data: { status: 'FINISH' } })
        const result = await prisma.diagnosis.create({ data: req.body })
        return res.json({result})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 'error', message: 'Internal server error' })
    }
}