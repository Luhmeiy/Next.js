import { cookies } from "next/headers";
import { MessageData } from "@/interfaces/MessageData";
import { api } from "@/lib/api";
import jwtDecode from "jwt-decode";
import { TokenData } from "@/interfaces/TokenData";

export default async function MessageList() {
	const token = cookies().get("token")?.value;

	const response = await api.get("/messages", {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	const tokenData: TokenData = jwtDecode(token!);

	const messages: MessageData[] = response.data.reverse();

	return (
		<div className="mb-4 mt-auto flex flex-1 flex-col-reverse gap-3 overflow-auto">
			{messages ? (
				<>
					{messages.map((message) => {
						return (
							<div
								key={message.id}
								className={`flex flex-col ${
									message.expand.user.id === tokenData.id &&
									"mr-2 self-end text-end"
								}`}
							>
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
