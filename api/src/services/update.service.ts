import { UpdateModel, UpdateStatus } from "../domain"

export const createUpdate = async (id: string): Promise<void> => {
    await UpdateModel.create({ id });
}

export const setUpdateStatus = async (id: string, status: UpdateStatus): Promise<void> => {
    await UpdateModel.updateOne({ id }, { $set: { status }});
}
