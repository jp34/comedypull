import { Router, Request, Response, NextFunction } from "express";
import { ComedianSearchParams, CreateComedianPayload } from "./entity";
import {
    createComedian,
    deleteComedian,
    findComedianById,
    findComediansBySearch,
    updateComedianBio,
    updateComedianName,
    updateComedianWebsite,
    updateComedianInstagram,
    updateComedianTwitter,
    updateComedianFacebook
} from "./service";

const router = Router();

router.post("/", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const payload: CreateComedianPayload = request.body.data;
        if (!payload) throw new Error("InvalidInput!");
        const data = await createComedian(payload);
        response.status(200).json({ data });
        next();
    } catch (err: any) {
        next(err);
    }
});

router.get("/", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const search: ComedianSearchParams = request.body.data;
        const data = await findComediansBySearch(search);
        response.status(200).json({ data });
        next();
    } catch (err: any) {
        next(err);
    }
});

router.get("/:id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id: string = request.params.id;
        const data = await findComedianById(id);
        response.status(200).json({ data });
        next();
    } catch (err: any) {
        next(err);
    }
});

router.put("/:id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id: string = request.params.id;
        if (request.query.name) await updateComedianName(id, request.query.name.toString());
        if (request.query.bio) await updateComedianBio(id, request.query.bio.toString());
        if (request.query.website) await updateComedianWebsite(id, request.query.website.toString());
        if (request.query.socialInstagram) await updateComedianInstagram(id, request.query.socialInstagram.toString());
        if (request.query.socialTwitter) await updateComedianTwitter(id, request.query.socialTwitter.toString());
        if (request.query.socialFacebook) await updateComedianFacebook(id, request.query.socialFacebook.toString());
        response.status(200);
        next();
    } catch (err: any) {
        next(err);
    }
});

router.delete("/:id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id: string = request.params.id;
        await deleteComedian(id);
        response.status(200);
        next();
    } catch (err: any) {
        next(err);
    }
});

export default router;
