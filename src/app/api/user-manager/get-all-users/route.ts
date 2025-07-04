import UsersModel from "@/models/UsersModel";
import { getAllUsers } from "@/utils/server/userManager/getAllUsers";
import { NextRequest, NextResponse } from "next/server";

export interface GetAllUserApiEndpointRequestEntry {
    dataPerPage: number,
    pageNumber: number,
    searchText: string,
}

export async function POST(request: NextRequest) {
    try {

        const {
            dataPerPage,
            pageNumber,
            searchText,
        } = await request.json() as GetAllUserApiEndpointRequestEntry;

        const usersData = await getAllUsers({
            dataPerPage,
            pageNumber,
            searchText,
        })

        const usersCount = await UsersModel.countDocuments({
            $or: [
                {
                    name: { $regex: searchText ? new RegExp(searchText, 'i') : "" }
                },
                {
                    email: { $regex: searchText ? new RegExp(searchText, 'i') : "" }
                }
            ],
        },);

        const response = NextResponse.json(usersData);
        response.headers.set('x-users-count', `${usersCount}`);

        return response;

    } catch (err) {
        let errMessage = "Something went wrong!";

        if (err instanceof Error) {
            errMessage = err.message;
        } else if (typeof err === "string") {
            errMessage = err;
        }

        return NextResponse.json(errMessage, { status: 500 });
    }
}