import { FastifyInstance, FastifyRequest } from "fastify";
import { pb } from "./../lib/pocketbase";

interface UserData {
	sub: string;
}

interface ItemToFilterData {
	created: string;
	updated: string;
	collectionId: string;
	collectionName: string;
}

interface ItemsToFilter extends ItemToFilterData {
	expand: {
		user: ItemToFilterData;
	};
}

export async function messageRoutes(app: FastifyInstance) {
	app.addHook("preHandler", async (request) => {
		await request.jwtVerify();
	});

	app.get("/", async (_, reply) => {
		const messages = await pb.collection("messages").getList(1, 50, {
			sort: "created",
			expand: "user",
			fields: "id,text,expand.user.username,expand.user.id",
		});

		const filteredMessages = messages.items.map(
			({
				created,
				updated,
				collectionId,
				collectionName,
				...item
			}: ItemsToFilter) => item
		);

		return reply.code(200).send(filteredMessages);
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
