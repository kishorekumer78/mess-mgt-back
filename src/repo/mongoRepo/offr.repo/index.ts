import Offr from '@/models/offr.model';
import { Msg } from '@/utilities/enums';
import dbConnect from '@/db/dbConnect';
import validateMongoDbId from '@/utilities/misc/validateMongoDbId';

export async function getAllOffrs(filter = {}, fields = {}) {
    try {
        await dbConnect();
        const offrs = await Offr.find(filter).select(fields).sort({ bd: 1 });
        if (offrs.length > 0) {
            return { success: true, message: Msg.DATA_FETCH_SUCCESS, data: offrs };
        } else {
            return { success: true, message: Msg.DATA_DB_EMPTY, data: [] };
        }
    } catch (error: any) {
        return { success: false, message: Msg.DATA_FETCH_FAIL, data: error.message };
    }
}

export async function getOffrById(id: string) {
    try {
        await dbConnect();
        validateMongoDbId(id);
        const offr = await Offr.findById(id);
        if (offr) {
            return { success: true, message: Msg.DATA_FETCH_SUCCESS, data: offr };
        } else {
            return { success: false, message: Msg.DATA_NOT_FOUND, data: [] };
        }
    } catch (error: any) {
        return { success: false, message: 'Failed to fetch Officer data', data: error.message };
    }
}

export async function deleteOffrById(id: string) {
    try {
        validateMongoDbId(id);
        await dbConnect();
        const deleteOffr = await Offr.findByIdAndDelete(id);
        if (deleteOffr) {
            return { success: false, message: Msg.DATA_DELETE_SUCCESS, data: deleteOffr };
        } else {
            return { success: false, message: Msg.DATA_DELETE_FAIL };
        }
    } catch (error: any) {
        return { success: false, message: Msg.SERVER_ERROR, data: error.message };
    }
}

export async function updateOffr(id: string, offrData: any) {
    try {
        validateMongoDbId(id);
        await dbConnect();
        // check if offr exists
        let foundOffr = await Offr.findById(id);

        if (foundOffr) {
            const updatedOffrData = await Offr.findByIdAndUpdate(id, offrData, {
                new: true
            });
            if (updatedOffrData) {
                return { message: Msg.DATA_UPDATE_SUCCESS, success: true, data: updatedOffrData };
            } else {
                return { message: Msg.DATA_UPDATE_FAIL, success: false };
            }
        } else {
            return { message: Msg.DATA_NOT_FOUND, success: false };
        }
        //const updatedOffr = await Offr.findOneAndUpdate({ bd: offr.bd }, offr);
    } catch (error: any) {
        return { message: Msg.SERVER_ERROR, success: false, data: error.message };
    }
}

export async function AddOfficer(offr: any) {
    try {
        await dbConnect();
        // check if officer exists with bd no
        const extOffr = await Offr.findOne({ bd: offr.bd });

        if (extOffr) {
            return { success: false, message: Msg.DATA_EXIST, data: {} };
        } else {
            // offr does not exist in db . so add offr
            const savedOffr = await Offr.create(offr);
            if (savedOffr) {
                return { success: true, message: Msg.DATA_ADD_SUCCESS, data: savedOffr };
            } else {
                return { success: false, message: Msg.DATA_ADD_FAIL, data: [] };
            }
        }
    } catch (error: any) {
        return { success: false, message: Msg.SERVER_ERROR, data: error.message };
    }
}
