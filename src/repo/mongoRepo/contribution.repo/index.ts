import dbConnect from '@/db/dbConnect';
import Contribution from '@/models/contribution.model';
import { Msg } from '@/utilities/enums';
import { ContributionType, ResponseType } from '@/utilities/types';
import validateMongoDbId from '@/utilities/misc/validateMongoDbId';

export const getAllContributions = async () => {
    try {
        await dbConnect();
        const contributions: ContributionType[] = await Contribution.find();
        if (contributions.length > 0) {
            return {
                success: true,
                message: Msg.DATA_FETCH_SUCCESS,
                data: contributions
            };
        } else {
            return { success: true, message: Msg.DATA_DB_EMPTY, data: [] };
        }
    } catch (error: any) {
        return {
            success: false,
            message: Msg.DATA_FETCH_FAIL,
            data: error.message
        };
    }
};

export async function getContributionById(id: string) {
    try {
        validateMongoDbId(id);
        await dbConnect();
        const foundCon = await Contribution.findById(id);
        if (foundCon) {
            return { success: true, message: Msg.DATA_FETCH_SUCCESS, data: foundCon };
        } else {
            return { success: false, message: Msg.DATA_NOT_FOUND, data: Msg.DATA_NOT_FOUND };
        }
    } catch (error: any) {
        return { success: false, message: Msg.DATA_DELETE_FAIL, data: error.message };
    }
}

export async function AddNewContribution(contribution: ContributionType) {
    try {
        await dbConnect();
        // check if already exists
        const extContribution = await Contribution.findOne({
            type: contribution.type
        });

        if (extContribution) {
            return { success: false, message: Msg.DATA_EXIST, data: 'Same Contribution Type is already present' };
        } else {
            // contribution does not exist in db . so add contribution
            if (contribution._id) delete contribution._id; //removing _id field

            const savedContribution = await Contribution.create(contribution);
            if (savedContribution) {
                return { success: true, message: Msg.DATA_ADD_SUCCESS, data: savedContribution };
            } else {
                return { success: false, message: Msg.DATA_ADD_FAIL, data: Msg.DATA_ADD_FAIL };
            }
        }
    } catch (error: any) {
        return { success: false, message: Msg.DATA_ADD_FAIL, data: error.message };
    }
}

export async function updateContribution(id: string, contributionData: ContributionType): Promise<ResponseType> {
    try {
        validateMongoDbId(id);
        await dbConnect();
        // check if contribution exists
        let foundCon = await Contribution.findById(id);

        if (foundCon) {
            const updatedConData = await Contribution.findByIdAndUpdate(id, contributionData, { new: true });

            if (updatedConData) {
                return { message: Msg.DATA_UPDATE_SUCCESS, success: true, data: updatedConData };
            } else {
                return { message: Msg.DATA_UPDATE_FAIL, success: false, data: Msg.DATA_UPDATE_FAIL };
            }
        } else {
            return { message: Msg.DATA_NOT_FOUND, success: false, data: Msg.DATA_NOT_FOUND };
        }
    } catch (error: any) {
        return { message: Msg.DATA_UPDATE_FAIL, success: false, data: error.message };
    }
}

export async function deleteContributionById(id: string) {
    try {
        validateMongoDbId(id);
        await dbConnect();
        const deleteCon = await Contribution.findByIdAndDelete(id);
        if (deleteCon) {
            return { success: true, message: Msg.DATA_DELETE_SUCCESS, data: deleteCon };
        } else {
            return { success: false, message: Msg.DATA_DELETE_FAIL, data: Msg.DATA_DELETE_FAIL };
        }
    } catch (error: any) {
        return { success: false, message: Msg.DATA_DELETE_FAIL, data: error.message };
    }
}
