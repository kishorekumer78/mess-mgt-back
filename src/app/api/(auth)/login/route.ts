import User from '@/models/user.model';
import bcryptjs from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@/db/dbConnect';

export const POST = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const reqBody = await request.json();
        await dbConnect();
        const { email, password } = reqBody;
        const user = await User.findOne({ email: email });
        if (!user) {
            return NextResponse.json({ error: 'User does not exist' }, { status: 400 });
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: 'Password not valid' }, { status: 400 });
        }
        //create token data
        const tokenData = {
            id: user._id,
            email: user.email,
            username: user.username
        };
        // create jwt token
        // @ts-ignore
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
            expiresIn: '3d'
        });
        // create response object
        const response = NextResponse.json(
            {
                message: 'Login Successful',
                success: true
            },
            { status: 200 }
        );

        // set cookies to response object
        response.cookies.set('token', token, { httpOnly: true });
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};
