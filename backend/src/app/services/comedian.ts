import { Comedian, ComedianModel } from "../../domain/entity";
import { ComedianSearchParams, CreateComedianPayload } from "../../domain/io";
import logger from "../../config/logger";

export const createComedian = async (payload: CreateComedianPayload): Promise<Comedian> => {
    const comedian = await ComedianModel.create({
        name: payload.name,
        bio: payload.bio,
        website: payload.website,
        socialInstagram: payload.socialInstagram,
        socialTwitter: payload.socialTwitter,
        socialFacebook: payload.socialFacebook
    });
    logger.info({
        action: "createComedian",
        resource: `comedian:${comedian._id}`
    });
    return comedian;
}

export const findComedianById = async (id: string): Promise<Comedian> => {
    const comedian = await ComedianModel.findById(id).lean();
    if (!comedian) throw new Error("NonExistentResource!");
    logger.info({
        action: "findComedianById",
        resource: `comedian:${comedian._id}`
    });
    return comedian;
}

export const findComediansBySearch = async (params: ComedianSearchParams): Promise<Array<Comedian>> => {
    const comedians = await ComedianModel.find(params).lean();
    logger.info({
        action: "findComediansBySearch"
    });
    return comedians;
}

export const updateComedianName = async (id: string, name: string): Promise<Boolean> => {
    const comedian = await ComedianModel.findById(id).select('_id name');
    if (!comedian) throw new Error("NonExistentResource!");
    comedian.name = name;
    await comedian.save();
    logger.info({
        action: "updateComedianName",
        resource: `comedian:${comedian._id}`
    });
    return true;
}

export const updateComedianBio = async (id: string, bio: string): Promise<Boolean> => {
    const comedian = await ComedianModel.findById(id).select('_id bio');
    if (!comedian) throw new Error("NonExistentResource!");
    comedian.bio = bio;
    await comedian.save();
    logger.info({
        action: "updateComedianBio",
        resource: `comedian:${comedian._id}`
    });
    return true;
}

export const updateComedianWebsite = async (id: string, website: string): Promise<Boolean> => {
    const comedian = await ComedianModel.findById(id).select('_id website');
    if (!comedian) throw new Error("NonExistentResource!");
    comedian.website = website;
    await comedian.save();
    logger.info({
        action: "updateComedianWebsite",
        resource: `comedian:${comedian._id}`
    });
    return true;
}

export const updateComedianInstagram = async (id: string, socialInstagram: string): Promise<Boolean> => {
    const comedian = await ComedianModel.findById(id).select('_id socialInstagram');
    if (!comedian) throw new Error("NonExistentResource!");
    comedian.socialInstagram = socialInstagram;
    await comedian.save();
    logger.info({
        action: "updateComedianInstagram",
        resource: `comedian:${comedian._id}`
    });
    return true;
}

export const updateComedianTwitter = async (id: string, socialTwitter: string): Promise<Boolean> => {
    const comedian = await ComedianModel.findById(id).select('_id socialTwitter');
    if (!comedian) throw new Error("NonExistentResource!");
    comedian.socialTwitter = socialTwitter;
    await comedian.save();
    logger.info({
        action: "updateComedianTwitter",
        resource: `comedian:${comedian._id}`
    });
    return true;
}

export const updateComedianFacebook = async (id: string, socialFacebook: string): Promise<Boolean> => {
    const comedian = await ComedianModel.findById(id).select('_id socialFacebook');
    if (!comedian) throw new Error("NonExistentResource!");
    comedian.socialFacebook = socialFacebook;
    await comedian.save();
    logger.info({
        action: "updateComedianFacebook",
        resource: `comedian:${comedian._id}`
    });
    return true;
}

export const deleteComedian = async (id: string): Promise<Boolean> => {
    const comedian = await ComedianModel.findById(id).select('_id');
    if (!comedian) throw new Error("NonExistentResource!");
    comedian.deleteOne();
    logger.info({
        action: "deleteComedian",
        resource: `comedian:${comedian._id}`
    });
    return true;
}
