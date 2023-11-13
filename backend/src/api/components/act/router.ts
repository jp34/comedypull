import { Router, Request, Response, NextFunction } from "express";
import { ActSearchParams } from "./entity";
import { findActById, findActsBySearch } from "./service";

const router = Router();

router.get("/", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const search: ActSearchParams = request.body.data;
        const data = await findActsBySearch(search);
        response.status(200).json({ data });
        next();
    } catch (err: any) {
        next(err);
    }
});

router.get("/:id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id: string = request.params.id;
        const data = await findActById(id);
        response.status(200).json({ data });
        next();
    } catch (err: any) {
        next(err);
    }
});

export default router;
