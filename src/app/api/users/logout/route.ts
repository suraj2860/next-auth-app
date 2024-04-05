import { connect } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';

connect()

export async function POST(req: NextRequest) {
    try {
        

        const response = NextResponse.json({
            message: "User logged out successfully",
            success: true
        },
            {
                status: 201
            }
        );

        response.cookies.set('accessToken', "", {
            httpOnly: true,
            expires: new Date(0)
        });

        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}