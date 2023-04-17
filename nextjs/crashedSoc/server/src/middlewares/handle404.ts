import { Request, Response } from "express";

export default function handle404 (_:Request, res:Response) {
    res.status(404).json({ error: "Requested endpoint not found" })
}