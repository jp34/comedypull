import { Router, Request, Response, NextFunction } from "express";
import { findShowById, findShowBySearch } from "./service";

const router = Router();

router.get("/", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const data = await findShowBySearch({});
        response.status(200).json({ data });
        next();
    } catch (err: any) {
        next(err);
    }
});

router.get("/:id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id: string = request.params.id;
        if (!id) throw new Error("InvalidInputError!");
        const data = await findShowById(id);
        response.status(200).json({ data });
        next();
    } catch (err: any) {
        next(err);
    }
});

export default router;
