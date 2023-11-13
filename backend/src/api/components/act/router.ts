import { Router, Request, Response, NextFunction } from "express";
import { ActSearchParams, CreateActPayload } from "./entity";
import {
    createAct,
    deleteAct,
    findActById,
    findActsBySearch,
    updateActBio,
    updateActName,
    updateActWebsite,
    updateActInstagram,
    updateActTwitter,
    updateActFacebook
} from "./service";

const router = Router();

router.post("/", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const payload: CreateActPayload = request.body.data;
        if (!payload) throw new Error("InvalidInput!");
        const data = await createAct(payload);
        response.status(200).json({ data });
        next();
    } catch (err: any) {
        next(err);
    }
});

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

router.put("/:id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id: string = request.params.id;
        if (request.query.name) await updateActName(id, request.query.name.toString());
        if (request.query.bio) await updateActBio(id, request.query.bio.toString());
        if (request.query.website) await updateActWebsite(id, request.query.website.toString());
        if (request.query.socialInstagram) await updateActInstagram(id, request.query.socialInstagram.toString());
        if (request.query.socialTwitter) await updateActTwitter(id, request.query.socialTwitter.toString());
        if (request.query.socialFacebook) await updateActFacebook(id, request.query.socialFacebook.toString());
        response.status(200);
        next();
    } catch (err: any) {
        next(err);
    }
});

router.delete("/:id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id: string = request.params.id;
        await deleteAct(id);
        response.status(200);
        next();
    } catch (err: any) {
        next(err);
    }
});

export default router;
