import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { api } from "@/lib/api";

export default function Login() {
	const handleSubmit = async (data: FormData) => {
		"use server";

		const user = {
			email: data.get("email"),
			password: data.get("password"),
		};

		try {
			const response = await api.post("/users/login", user);

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
			<h1 className="mb-4 text-3xl font-bold uppercase">Login</h1>

			<form className="mb-4 flex flex-col gap-2">
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

				<button
					type="submit"
					className="rounded bg-green-400 p-2 hover:bg-green-500 active:bg-green-300"
					formAction={handleSubmit}
				>
					Login
				</button>
			</form>

			<Link
				href="/register"
				className="font-semibold text-blue-400 hover:text-blue-600"
			>
				Create an account
			</Link>
		</>
	);
}
