import { deleteContributionById, getContributionById, updateContribution } from '@/repo/mongoRepo/contribution.repo';
import { Msg } from '@/utilities/enums';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, context: { params: { id: string } }) {
    const { id } = context.params;

    try {
        const result = await getContributionById(id);
        if (result.success === true) {
            return NextResponse.json(result, { status: 200 });
        } else {
            return NextResponse.json(result, { status: 404 });
        }
    } catch (error: any) {
        return NextResponse.json({ message: Msg.SERVER_ERROR, success: false, data: error.message }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        // grab the id from params
        const { id } = params;

        // grab the req body
        const reqBody = await request.json();

        // update repository
        const result = await updateContribution(id, reqBody);
        if (result.success) {
            return NextResponse.json(result, { status: 200 });
        } else {
            return NextResponse.json(result, { status: 400 });
        }
    } catch (error: any) {
        return NextResponse.json({ message: Msg.SERVER_ERROR, success: false, data: error.message }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        // grab the id from params
        const { id } = params;
        const result = await deleteContributionById(id);
        if (result.success) {
            return NextResponse.json(result, { status: 200 });
        } else {
            return NextResponse.json(result, { status: 500 });
        }
    } catch (error: any) {
        return NextResponse.json({ message: Msg.SERVER_ERROR, success: false, data: error.message }, { status: 500 });
    }
}
