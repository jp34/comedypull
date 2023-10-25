import { Router, Request, Response, NextFunction } from "express";
import { CreateShowPayload } from "./entity";
import { createShow, deleteShow, findShowById, findShowBySearch, updateShowDate, updateShowVenueAddress, updateShowVenueName } from "./service";

const router = Router();

router.post("/", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const payload: CreateShowPayload = request.body.data;
        if (!payload) throw new Error("InvalidInputError!");
        const data = await createShow(payload);
        response.status(200).json({ data });
        next();
    } catch (err: any) {
        next(err);
    }
});

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

router.put("/:id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id: string = request.params.id;
        if (!id) throw new Error("InvalidInputError!");
        if (request.query.date) await updateShowDate(id, request.query.date.toString());
        if (request.query.venueName) await updateShowVenueName(id, request.query.venueName.toString());
        if (request.query.venueAddress) await updateShowVenueAddress(id, request.query.venueAddress.toString());
        response.status(200);
        next();
    } catch (err: any) {
        next(err);
    }
});

router.delete("/:id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id: string = request.params.id;
        if (!id) throw new Error("InvalidInputError!");
        await deleteShow(id);
        response.status(200);
        next();
    } catch (err: any) {
        next(err);
    }
});

export default router;
