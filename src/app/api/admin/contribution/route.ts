import { NextRequest, NextResponse } from 'next/server';
import { AddNewContribution, getAllContributions } from '@/repo/mongoRepo/contribution.repo';
import { ResponseType } from '@/utilities/types';
import { Msg } from '@/utilities/enums';

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const reqBody = await request.json();
        const res = await AddNewContribution(reqBody);
        if (res.success) {
            return NextResponse.json(res, { status: 201 });
        } else {
            return NextResponse.json(res, { status: 500 });
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message, success: false, message: Msg.SERVER_ERROR }, { status: 500 });
    }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        const result: ResponseType = await getAllContributions();

        if (result.success) {
            return NextResponse.json(result, { status: 200 });
        } else {
            return NextResponse.json(result, { status: 500 });
        }
    } catch (error: any) {
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
}
