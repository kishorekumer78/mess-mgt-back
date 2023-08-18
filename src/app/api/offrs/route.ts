import { NextRequest, NextResponse } from 'next/server';
import { AddOfficer, getAllOffrs } from '@/repo/mongoRepo/offr.repo';
import { Msg } from '@/utilities/enums';
import { ResponseType } from '@/utilities/types';

export const GET = async (request: NextRequest) => {
    try {
        let filter: any = {};
        const rank = request.nextUrl.searchParams.get('rank') || '';
        const unit = request.nextUrl.searchParams.get('unit') || '';
        const messIn = request.nextUrl.searchParams.get('messIn') || '';
        const outStation = request.nextUrl.searchParams.get('outStation') || '';
        if (rank) filter.rank = rank;
        if (unit) filter.unit = unit;
        if (messIn) filter.messIn = messIn;
        if (Number(outStation) > 0) filter.outStation = true;

        let fieldsObj: any = {};
        const fields = request.nextUrl.searchParams.get('fields') || '';
        if (fields) {
            const fieldsArray = fields?.split('_');
            if (fieldsArray.length > 0) {
                fieldsArray.forEach((el: string) => {
                    fieldsObj[el] = 1;
                });
            }
            // console.log(fieldsArray);
        }

        const res = await getAllOffrs(filter, fieldsObj);

        if (res.success) {
            return NextResponse.json(res, { status: 200 });
        } else {
            return NextResponse.json(res, { status: 500 });
        }
    } catch (error: any) {
        return NextResponse.json(
            { message: Msg.DATA_FETCH_FAIL, data: error.message, success: false },
            { status: 500 }
        );
    }
};

export const POST = async (request: NextRequest): Promise<NextResponse> => {
    const reqBody = await request.json();

    const res: ResponseType = await AddOfficer(reqBody);

    if (res.success) {
        return NextResponse.json(res, { status: 201 });
    } else {
        return NextResponse.json(res);
    }
};
