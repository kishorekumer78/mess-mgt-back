import { Month } from '../enums';
import { DailyMessingType } from '../types';

export function formatDate(date: Date): string {
    let year = date.getFullYear();
    let month = Object.keys(Month)[date.getMonth()];
    let day = date.getDate();

    return `${day} ${month} ${year}`;
}

export function incrementDay(date: Date, num: number) {
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    if (day + num > findLastDayOfMonth(date)) {
        return null;
    } else {
        return new Date(year, month, day + num, 8, 0, 0);
    }
}

export const findLastDayOfMonth = (date: Date): number => {
    // console.log(days);
    return new Date(date.getFullYear(), date.getMonth() + 1, 0, 8, 0, 0).getDate();
};

export function prepareDailyMessingPayload(dailyMessingArray: DailyMessingType[]) {
    const messingBills = dailyMessingArray.filter(
        (item) => Number(item.breakfast) !== 0 || Number(item.lunch !== 0) || Number(item.dinner) !== 0
    );
    // convert the breakfast,lunch, dinner value to number
    const payLoad: DailyMessingType[] = messingBills.map((item) => {
        return {
            ...item,
            breakfast: Number(item.breakfast),
            lunch: Number(item.lunch),
            dinner: Number(item.dinner),
            date: item.date
        };
    });
    return payLoad;
}

export function calculateTotalBill(dailyMessings: DailyMessingType[]): number {
	let totalBill = 0;
	dailyMessings.forEach((item) => {
		totalBill = totalBill + Number(item.breakfast) + Number(item.lunch) + Number(item.dinner);
	});
	return totalBill;
}

// var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
// var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
