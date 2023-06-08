import { FastifyInstance } from "fastify";

export async function userRoutes(app: FastifyInstance) {
	app.post("/", async (request, reply) => {
		const body = request.body;

		console.log(body);

		const expirationTime = 7 * 24 * 60 * 60 * 100;

		const token = await reply.jwtSign(
			{ body },
			{
				expiresIn: expirationTime,
			}
		);

		return reply.code(201).send(token);
	});

	app.log.info("User routes registered");
}
