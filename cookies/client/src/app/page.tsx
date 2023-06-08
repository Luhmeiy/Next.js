import { cookies } from "next/headers";
import Register from "@/app/register/page";
import { api } from "@/lib/api";
import UserNav from "@/components/UserNav";

export default async function Home() {
	const isAuthenticated = cookies().has("token");

	if (!isAuthenticated) {
		return <Register />;
	}

	const token = cookies().get("token")?.value;

	const response = await api.get("/messages", {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	const messages = response.data;

	return (
		<>
			<UserNav />

			<h1 className="mb-4 text-3xl font-bold uppercase">Messages</h1>
			{messages ? (
				<div>
					<p>{messages.title}</p>
					<p>{messages.text}</p>
				</div>
			) : (
				<p>No messages</p>
			)}
		</>
	);
}
