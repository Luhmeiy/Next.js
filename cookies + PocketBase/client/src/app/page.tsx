import { cookies } from "next/headers";
import Login from "@/app/login/page";
import { api } from "@/lib/api";
import UserNav from "@/components/UserNav";
import CreateMessage from "@/components/CreateMessage";
import { MessageData } from "@/interfaces/MessageData";

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

	const messages: MessageData[] = response.data;

	return (
		<div className="flex h-full w-full flex-col rounded bg-white px-6 py-3">
			<UserNav />

			<h1 className="mb-4 text-center text-3xl font-bold uppercase">
				Messages
			</h1>

			<div className="mb-4 flex flex-1 flex-col justify-end gap-3 overflow-auto">
				{messages ? (
					<>
						{messages.map((message) => {
							return (
								<div key={message.id} className="flex flex-col">
									<span className="text text-xs text-gray-500">
										{message.expand.user.username}
									</span>
									<p>{message.text}</p>
								</div>
							);
						})}
					</>
				) : (
					<p>No messages</p>
				)}
			</div>

			<CreateMessage />
		</div>
	);
}
