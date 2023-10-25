import { Router, Request, Response, NextFunction } from "express";
import { ComedianSearchParams, CreateComedianPayload } from "../domain/io";
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
} from "./services/comedian";

const router = Router();

router.post("/api/comedians", async (request: Request, response: Response, next: NextFunction) => {
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

router.get("/api/comedians", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const search: ComedianSearchParams = request.body.data;
        const data = await findComediansBySearch(search);
        response.status(200).json({ data });
        next();
    } catch (err: any) {
        next(err);
    }
});

router.get("/api/comedians/:id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id: string = request.params.id;
        const data = await findComedianById(id);
        response.status(200).json({ data });
        next();
    } catch (err: any) {
        next(err);
    }
});

router.put("/api/comedians/:id", async (request: Request, response: Response, next: NextFunction) => {
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

router.delete("/api/comedians/:id", async (request: Request, response: Response, next: NextFunction) => {
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
