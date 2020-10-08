import express, { Router, Request, Response } from "express";

const router: Router = express.Router();



router.get('/image', async (req: Request, res: Response) => {
    try {
        res.send('OK Image Processing');
    } catch (e) {
        res.status(500).send(e.toString());
    }
});

export default router;