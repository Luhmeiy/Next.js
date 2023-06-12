import { cookies } from "next/headers";
import Login from "@/app/login/page";
import { api } from "@/lib/api";
import UserNav from "@/components/UserNav";
import CreateMessage from "@/components/CreateMessage";

export default async function Home() {
	const isAuthenticated = cookies().has("token");

	if (!isAuthenticated) {
		return <Login />;
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
			<CreateMessage />

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
