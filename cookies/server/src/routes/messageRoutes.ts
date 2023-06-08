import { FastifyInstance } from "fastify";

export async function messageRoutes(app: FastifyInstance) {
	app.addHook("preHandler", async (request) => {
		await request.jwtVerify();
	});

	app.get("/", async (_, reply) => {
		const doc = {
			title: "messageTitle",
			text: "messageText",
		};

		return reply.code(200).send(doc);
	});

	app.log.info("Message routes registered");
}
