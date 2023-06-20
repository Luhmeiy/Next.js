import { FastifyInstance } from "fastify";

export async function authRoutes(app: FastifyInstance) {
	app.get("/", async (request, reply) => {
		try {
			await request.jwtVerify();

			reply.code(200).send({ ok: true });
		} catch (error) {
			reply.code(403).send({ ok: false });
		}
	});
}
