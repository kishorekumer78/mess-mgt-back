import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/user.model';
import {retrieveTokenData} from "@/utilities/misc/retrieveTokenData";

export const GET = async (request: NextRequest) => {
    if (request.cookies.get('token')) {
        const userId = retrieveTokenData(request);
        if (userId) {
            const user = await User.findById(userId).select('-password');
            if (user) {
                return NextResponse.json(
                    {
                        message: 'User Found',
                        success: true,
                        data: user
                    },
                    { status: 200 }
                );
            } else {
                return NextResponse.json({ message: 'User not found', success: false }, { status: 400 });
            }
        }
    } else {
        return NextResponse.json({ message: 'Token not found', success: false });
    }
};
