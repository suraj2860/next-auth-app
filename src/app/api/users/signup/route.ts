import { connect } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/user.model';
import bcrypt from 'bcryptjs';
import { sendEmail } from '@/helpers/mailer';

connect()

export async function POST(req: NextRequest) {
    try {
        const { username, email, password } = await req.json();

        console.log({ username, email, password });

        const user = await User.findOne({ email });

        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save();
        console.log(savedUser);

        const mailResponse = await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

        return NextResponse.json({
            message: "User registered successfully",
            success: true,
            savedUser
        },
            {
                status: 201
            }
        );

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}