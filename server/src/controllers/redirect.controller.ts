import { prisma } from '../config/prisma'
import { select } from './history.controller'
import type { Request, Response } from 'express'

export const createRedirect = async (req: Request, res: Response) => {
    try {
        const result = await prisma.redirect.create({ data: req.body, select: select.redirects.select })
        return res.json({result})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 'error', message: 'Internal server error' })
    }
}