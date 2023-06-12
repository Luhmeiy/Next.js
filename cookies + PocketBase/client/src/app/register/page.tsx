"use client";

import { api } from "@/lib/api";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function Register() {
	const { push } = useRouter();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const form = new FormData(e.currentTarget);

		const user = {
			username: form.get("username"),
			email: form.get("email"),
			password: form.get("password"),
			passwordConfirm: form.get("confirmPassword"),
		};

		try {
			const response = await api.post("/users/register", user);

			Cookie.set("token", response.data, { expires: 7 });

			push("/");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<h1 className="mb-4 text-3xl font-bold uppercase">Register</h1>

			<form className="flex flex-col gap-2" onSubmit={handleSubmit}>
				<input
					type="text"
					name="username"
					className="rounded border-2 border-zinc-500 px-2 py-1"
					placeholder="Your name"
					required
				/>
				<input
					type="email"
					name="email"
					className="rounded border-2 border-zinc-500 px-2 py-1"
					placeholder="Your email"
					required
				/>
				<input
					type="password"
					name="password"
					className="rounded border-2 border-zinc-500 px-2 py-1"
					placeholder="Your password"
					required
				/>
				<input
					type="password"
					name="confirmPassword"
					className="rounded border-2 border-zinc-500 px-2 py-1"
					placeholder="Confirm your password"
					required
				/>

				<button type="submit" className="rounded bg-green-400 p-2">
					Register
				</button>
			</form>
		</>
	);
}
