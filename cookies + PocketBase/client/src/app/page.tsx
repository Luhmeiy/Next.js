import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import MessageList from "./messageList/page";
import UserNav from "@/components/UserNav";
import CreateMessage from "@/components/CreateMessage";
import { api } from "@/lib/api";

export default async function Home() {
	const token = cookies().get("token")?.value;

	if (!token) redirect("/login");

	const response = (await api.get("/auth", {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})) as { data: { ok: boolean } };

	if (!response.data.ok) redirect("/login");

	return (
		<div className="flex h-full w-full flex-col rounded bg-white px-6 py-3">
			<UserNav />

			<h1 className="mb-4 text-center text-3xl font-bold uppercase">
				Messages
			</h1>

			<MessageList />
			<CreateMessage />
		</div>
	);
}
