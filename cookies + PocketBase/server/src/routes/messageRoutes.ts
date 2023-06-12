import { FastifyInstance, FastifyRequest } from "fastify";
import { pb } from "./../lib/pocketbase";

interface UserData {
	sub: string;
}

export async function messageRoutes(app: FastifyInstance) {
	app.addHook("preHandler", async (request) => {
		await request.jwtVerify();
	});

	app.get("/", async (request, reply) => {
		const doc = {
			title: "messageTitle",
			text: "messageText",
		};

		return reply.code(200).send(doc);
	});

	app.post(
		"/",
		async (
			request: FastifyRequest<{
				Body: {
					message: string;
				};
			}>,
			reply
		) => {
			const body = request.body;

			const user = request.user as UserData;

			const messageData = {
				text: body.message,
				user: user.sub,
			};

			try {
				const response = await pb
					.collection("messages")
					.create(messageData);

				return reply.code(201).send(response);
			} catch (error) {
				return reply.code(500).send(error);
			}
		}
	);

	app.log.info("Message routes registered");
}
