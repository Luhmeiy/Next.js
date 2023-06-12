"use client";

import { api } from "@/lib/api";
import Cookies from "js-cookie";
import { FormEvent, useState } from "react";

export default function CreateMessage() {
	const [message, setMessage] = useState("");

	const token = Cookies.get("token");

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const form = new FormData(e.currentTarget);

		const messageData = {
			message: form.get("message") as string,
		};

		try {
			await api.post("/messages", messageData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			setMessage("");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<form className="mb-4 flex gap-2 self-center" onSubmit={handleSubmit}>
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
				className="rounded bg-green-400 px-4 py-2 hover:bg-green-500 active:bg-green-300"
			>
				Post
			</button>
		</form>
	);
}
