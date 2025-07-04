import { dbConnect } from "@/database/DBConfig";
import UsersModel, { UserModelInterface } from "@/models/UsersModel";

export async function getAllUsers({
    dataPerPage,
    pageNumber,
    searchText,
}: {
    searchText: string,
    pageNumber: number,
    dataPerPage: number,
}) {
    return new Promise<UserModelInterface[]>(async (resolve, reject) => {
        try {
            await dbConnect();

            pageNumber--

            const skip = pageNumber * dataPerPage;

            const usersData: UserModelInterface[] = await UsersModel.find(
                {
                    $or: [
                        {
                            name: { $regex: searchText ? new RegExp(searchText, 'i') : "" }
                        },
                        {
                            email: { $regex: searchText ? new RegExp(searchText, 'i') : "" }
                        }
                    ],
                },
                null,
                {
                    skip,
                    limit: dataPerPage,
                }
            )

            if (!usersData) {
                return resolve([]);
            }

            return resolve(usersData);
        } catch (err) {
            return reject(err);
        }
    })
}
