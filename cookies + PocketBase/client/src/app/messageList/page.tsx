import { cookies } from "next/headers";
import { MessageData } from "@/interfaces/MessageData";
import { api } from "@/lib/api";

export default async function MessageList() {
	const token = cookies().get("token")?.value;

	const response = await api.get("/messages", {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	const messages: MessageData[] = response.data;

	return (
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
	);
}
