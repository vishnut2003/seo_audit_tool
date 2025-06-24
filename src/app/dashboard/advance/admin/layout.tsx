import BasicLayout from "@/layouts/BasicLayout/BasicLayout";
import { RiErrorWarningFill } from "@remixicon/react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ReactNode } from "react"

const layout = async ({
    children,
}: {
    children: ReactNode,
}) => {

    const userSession = await getServerSession();

    if (!userSession || !userSession.user?.email) {
        redirect('/');
    }

    const adminEmail = process.env.MAIN_ADMIN_EMAIL;

    if (!adminEmail) {
        throw new Error("Please provide MAIN_ADMIN_EMAIL in .env");
    }

    const isAdmin = userSession.user.email === adminEmail;

    if (!isAdmin) {
        return (
            <BasicLayout>
                <div
                    className="flex items-center justify-between w-full bg-red-100 text-red-500 py-2 px-4 rounded-md shadow-xl shadow-gray-200"
                >
                    <div
                        className="flex items-center gap-3"
                    >
                        <RiErrorWarningFill
                            size={20}
                        />
                        <p>You are not allowed in this page!</p>
                    </div>
                    <Link
                        href={'/dashboard'}
                    >
                        Go to Dashboard
                    </Link>
                </div>
            </BasicLayout>
        )
    }

    return children;
}

export default layout