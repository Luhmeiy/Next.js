"use client";

import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/navigation";

interface TokenData {
	user: {
		id: string;
		username: string;
		email: string;
	};
}

export default function UserNav() {
	const { push } = useRouter();

	const token = Cookies.get("token");

	const tokenData: TokenData = jwtDecode(token!);
	const { user } = tokenData;

	const handleSignOut = () => {
		Cookies.remove("token");

		push("/");
	};

	return (
		<>
			{user && (
				<div className="mb-4 flex w-full justify-between gap-4">
					<p>Welcome, {user.username}</p>
					<p
						onClick={handleSignOut}
						className="cursor-pointer font-bold text-blue-400 hover:text-blue-500"
					>
						Sign Out
					</p>
				</div>
			)}
		</>
	);
}
