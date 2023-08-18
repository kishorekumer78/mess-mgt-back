import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export const retrieveTokenData = (request: NextRequest) => {
    try {
        const decodedToken = request.cookies.get('token')?.value || '';
        // @ts-ignore
        const payload: any = jwt.verify(decodedToken, process.env.JWT_SECRET);
        return payload.id;
    } catch (error: any) {
        throw new Error(error.message);
    }
};
