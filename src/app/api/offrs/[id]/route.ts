import { deleteOffrById, getOffrById, updateOffr } from '@/repo/mongoRepo/offr.repo';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest, context: { params: { id: string } }) => {
    const { id } = context.params;

    try {
        const result = await getOffrById(id);
        if (result.success) {
            return NextResponse.json(result, { status: 200 });
        } else {
            return NextResponse.json(result, { status: 404 });
        }
    } catch (error: any) {
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};

export const PUT = async (request: NextRequest, context: { params: { id: string } }) => {
    try {
        // grab the id from params
        const { id } = context.params;

        // grab the req body
        const reqBody = await request.json();
        // update repository
        const result = await updateOffr(id, reqBody);
        if (result.success) {
            return NextResponse.json(result, { status: 200 });
        } else {
            return NextResponse.json(result, { status: 400 });
        }
    } catch (error: any) {
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};

export const DELETE = async (request: NextRequest, context: { params: { id: string } }) => {
    try {
        const { id } = context.params;
        const result = await deleteOffrById(id);
        if (result.success) {
            return NextResponse.json(result, { status: 200 });
        } else {
            return NextResponse.json(result);
        }
    } catch (error: any) {
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
