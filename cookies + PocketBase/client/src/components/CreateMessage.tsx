"use client";

import { useState } from "react";
import { handleSubmit } from "@/utils/handleSubmit";

export default function CreateMessage() {
	const [message, setMessage] = useState("");

	const middleware = async (data: FormData) => {
		await handleSubmit(data);

		setMessage("");
	};

	return (
		<form className="mb-4 flex gap-2 self-center" action={middleware}>
			<input
				type="text"
				name="message"
				placeholder="Write a message"
				className="rounded border-2 border-zinc-500 px-2 py-1"
				value={message}
				onChange={(e) => setMessage(e.target.value)}
			/>

			<button
				type="submit"
				className="rounded bg-green-400 px-4 py-2 transition-colors duration-500 hover:bg-green-500 active:bg-green-300"
			>
				Post
			</button>
		</form>
	);
}
