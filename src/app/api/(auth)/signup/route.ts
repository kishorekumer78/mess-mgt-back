import bcryptjs from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/user.model';
import dbConnect from '@/db/dbConnect';

export const POST = async (request: NextRequest): Promise<NextResponse> => {
    try {
        await dbConnect();
        const reqBody = await request.json();
        const { username, email, password } = reqBody;
        // check if user exists
        const user = await User.findOne({ email: email });
        if (user) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }
        //hash password
        let salt = await bcryptjs.genSalt(10);
        let hashedPassword = await bcryptjs.hash(password, salt);
        const savedUser = await User.create({
            username,
            email,
            password: hashedPassword
        });
        return NextResponse.json({
            message: 'User created successfully',
            success: true,
            data: savedUser
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};
