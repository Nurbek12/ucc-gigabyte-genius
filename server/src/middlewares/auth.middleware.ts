import jwt from 'jsonwebtoken'
import { SECRET } from '../config/variables'
import type { Response, NextFunction } from 'express'

export const authMiddleware = async (req: any, res: Response, next: NextFunction) => {
    const { authorization } = req.headers
    const token = authorization?.replace('Bearer ', '')
    
    if(!token) return res.status(401).json({ status: "warning", message: "Вам нужно войти в систему" })
    
    jwt.verify(token, SECRET!, (err: any, user: any) => {
        if(err) return res.status(401).json({ status: "warning", message: "Вам нужно войти в систему" })
        
        req.user = user as any
        next()
    })
}