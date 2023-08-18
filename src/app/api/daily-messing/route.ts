import { addDailyMessings, getDailyMessings } from '@/repo/mongoRepo/daily-messing.repo';
import { Msg } from '@/utilities/enums';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
    try {
        const reqBody = await req.json();
        // console.log(reqBody);

        const res = await addDailyMessings(reqBody);
        if (res.success) {
            return NextResponse.json(res, { status: 201 });
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
export const GET = async (req: NextRequest): Promise<NextResponse> => {
    //get search params from the request
    const offrId = req.nextUrl.searchParams.get('offrId');
    const date = req.nextUrl.searchParams.get('date');
    if (offrId && date) {
        const res = await getDailyMessings(offrId, date);
        if (res.success) {
            return NextResponse.json(res, { status: 200 });
        } else {
            return NextResponse.json(res, { status: 500 });
        }
    } else {
        return NextResponse.json({ message: Msg.INVALID_ENTRY }, { status: 400 });
    }
};
