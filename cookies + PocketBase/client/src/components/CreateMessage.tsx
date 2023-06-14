import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { api } from "@/lib/api";

export default function CreateMessage() {
	const token = cookies().get("token")?.value;

	const handleSubmit = async (data: FormData) => {
		"use server";

		const messageData = {
			message: data.get("message") as string,
		};

		try {
			await api.post("/messages", messageData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			revalidatePath("/messageList");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<form className="mb-4 flex gap-2 self-center" action={handleSubmit}>
			<input
				type="text"
				name="message"
				placeholder="Write a message"
				className="rounded border-2 border-zinc-500 px-2 py-1"
			/>

			<button
				type="submit"
				className="rounded bg-green-400 px-4 py-2 hover:bg-green-500 active:bg-green-300"
			>
				Post
			</button>
		</form>
	);
}
