import DailyMessing from '@/models/daily-messing.model';
import { Msg } from '@/utilities/enums';
import { findLastDayOfMonth } from '@/utilities/misc';
import { DailyMessingType, ResponseType } from '@/utilities/types';
import dbConnect from '@/db/dbConnect';

export async function addDailyMessings(dailyMessings: DailyMessingType[]) {
    try {
        await dbConnect();
        for (const element of dailyMessings) {
            const messing = await DailyMessing.findOne({
                offr: element.offr,
                date: element.date
            });
            if (messing) {
                messing.dinner = element.dinner;
                messing.breakfast = element.breakfast;
                messing.lunch = element.lunch;
                await messing.save();
            } else {
                await DailyMessing.create(element);
            }
        }

        return {
            message: Msg.DATA_ADD_SUCCESS,
            success: true,
            data: 'Update Successful'
        };
    } catch (error: any) {
        return { message: Msg.DATA_ADD_FAIL, success: false, data: error.message };
    }
}

export async function getDailyMessings(offrId: string, date: string): Promise<ResponseType> {
    try {
        const firstDate = new Date(Number(date));
        const lastDate = new Date(
            firstDate.getFullYear(),
            firstDate.getMonth(),
            findLastDayOfMonth(firstDate),
            8,
            0,
            0
        );
        const data: DailyMessingType[] = await DailyMessing.find({
            date: { $gte: firstDate, $lte: lastDate },
            offr: offrId
        });
        // console.log(data);
        if (data.length > 0) {
            return { message: Msg.DATA_FETCH_SUCCESS, success: true, data: data };
        } else {
            return { message: Msg.DATA_FETCH_FAIL, success: false, data: [] };
        }
    } catch (error: any) {
        return { message: Msg.SERVER_ERROR, success: false, data: error.message };
    }
}

// {
// 	breakfast: 120;
// 	date: " Thu Mar 02 2023 08:00:00 GMT+0600 (Bangladesh Standard Time)";
// 	dinner: 0;
// 	lunch: 0;
// 	offr: "64da2ff90fa8dbf4878694eb";
// }

// console.log(bulkOperations);
