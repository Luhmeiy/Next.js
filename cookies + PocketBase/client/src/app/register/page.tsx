import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { api } from "@/lib/api";

export default function Register() {
	const handleSubmit = async (data: FormData) => {
		"use server";

		const user = {
			username: data.get("username"),
			email: data.get("email"),
			password: data.get("password"),
			passwordConfirm: data.get("confirmPassword"),
		};

		try {
			const response = await api.post("/users/register", user);

			const expirationTime = 60 * 60 * 24 * 7;

			cookies().set("token", response.data, {
				maxAge: expirationTime,
				path: "/",
			});
		} catch (error) {
			console.log(error);
		}

		redirect("/");
	};

	return (
		<>
			<h1 className="mb-4 text-3xl font-bold uppercase">Register</h1>

			<form className="mb-4 flex flex-col gap-2" action={handleSubmit}>
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

			<Link
				href="/login"
				className="font-semibold text-blue-400 hover:text-blue-600"
			>
				Login
			</Link>
		</>
	);
}
