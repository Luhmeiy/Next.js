"use server";

import { api } from "@/lib/api";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const token = cookies().get("token")?.value;

export const handleSubmit = async (data: FormData) => {
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
