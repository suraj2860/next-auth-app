import { connect } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/user.model';
import bcrypt from 'bcryptjs';
import { sendEmail } from '@/helpers/mailer';

connect();

export async function POST(req: NextRequest) {
    try {
        const { token } = await req.json();
        console.log(token);

        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return NextResponse.json({ error: "Invalid Token" }, { status: 500 });
        }
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();

        return NextResponse.json({
            message: "Email verified successfully",
            success: true,
        },
            {
                status: 200
            }
        );

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}