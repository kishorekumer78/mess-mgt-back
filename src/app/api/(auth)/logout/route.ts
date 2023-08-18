import { NextResponse } from 'next/server';

export const GET = async (): Promise<NextResponse> => {
    try {
        const response = NextResponse.json({
            message: 'Logout Successful',
            success: true
        });
        response.cookies.delete('token');
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
};
