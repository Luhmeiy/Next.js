"use client";

import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/navigation";

interface UserData {
	body: {
		name: string;
		email: string;
	};
}

const UserNav = () => {
	const { push } = useRouter();

	const token = Cookies.get("token");

	const user: UserData = jwtDecode(token!);

	const handleSignOut = () => {
		Cookies.remove("token");

		push("/register");
	};

	return (
		<>
			{user && (
				<>
					<p>Welcome, {user.body.name}</p>
					<p
						onClick={handleSignOut}
						className="mb-4 cursor-pointer font-bold text-blue-400 hover:text-blue-500"
					>
						Sign Out
					</p>
				</>
			)}
		</>
	);
};

export default UserNav;
