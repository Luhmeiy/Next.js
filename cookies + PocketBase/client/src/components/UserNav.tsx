"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { TokenData } from "@/interfaces/TokenData";

export default function UserNav() {
	const { push } = useRouter();

	const token = Cookies.get("token");

	const tokenData: TokenData = jwtDecode(token!);

	const handleSignOut = () => {
		Cookies.remove("token");

		push("/login");
	};

	return (
		<>
			{tokenData && (
				<div className="mb-4 flex w-full justify-between gap-4">
					<p>Welcome, {tokenData.username}</p>
					<p
						onClick={handleSignOut}
						className="cursor-pointer font-bold text-blue-400 transition-colors duration-500 hover:text-blue-500"
					>
						Sign Out
					</p>
				</div>
			)}
		</>
	);
}
