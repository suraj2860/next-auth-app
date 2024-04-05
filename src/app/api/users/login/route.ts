import { connect } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

connect();

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        console.log({ email, password });

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        
        const isPasswordValid = await bcrypt.compare(password, user?.password);

        if(!isPasswordValid) {
            return NextResponse.json({ error: "Invalid user credentials" }, { status: 400 });
        }
        
        const accessToken = jwt.sign(
            {
                _id: user._id,
                username: user.username,
                email: user.email
            },
            process.env.TOKEN_SECRET!,
            {
                expiresIn: '1d'
            }
        )

        const response =  NextResponse.json({
            message: "User logged in successfully",
            success: true,
            user
        },
            {
                status: 200
            }
        );

        response.cookies.set('accessToken', accessToken, {
            httpOnly: true
        });

        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}