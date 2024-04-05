import { connect } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/user.model';
import { getDataFromToken } from '@/helpers/getDataFromToken';

connect();

export async function GET(req: NextRequest) {
    try {
        const userID = await getDataFromToken(req);

        const user = await User.findById(userID).select("-password");

        if(!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            message: "Current user fetched successfully",
            success: true,
            user
        },
            {
                status: 200
            }
        );

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}