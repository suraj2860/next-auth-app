import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";


export const getDataFromToken = (req: NextRequest) => {
    try {
        const token = req.cookies.get("accessToken")?.value || "";
        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);

        return decodedToken._id;
    } catch (error: any) {
        throw new Error(error.message);
    }
}