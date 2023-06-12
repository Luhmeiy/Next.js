import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { pb } from "../lib/pocketbase";

interface UserData {
	id: string;
	username: string;
	email: string;
}

interface RequestData {
	Body: {
		username: string;
		email: string;
		password: string;
	};
}

export async function userRoutes(app: FastifyInstance) {
	const createToken = (userData: UserData) => {
		const expirationTime = 7 * 24 * 60 * 60 * 100;

		const token = app.jwt.sign(
			{ user: userData },
			{
				sub: userData.id,
				expiresIn: expirationTime,
			}
		);

		return token;
	};

	app.post(
		"/register",
		async (request: FastifyRequest<RequestData>, reply) => {
			const body = request.body;
			let userData: UserData;

			try {
				const response = await pb.collection("users").create(body);

				userData = {
					id: response.id,
					username: body.username,
					email: body.email,
				};
			} catch (error) {
				return reply.code(500).send(error);
			}

			const token = createToken(userData);

			return reply.code(201).send(token);
		}
	);

	app.post("/login", async (request: FastifyRequest<RequestData>, reply) => {
		const body = request.body;
		let userData: UserData;

		try {
			const response = await pb
				.collection("users")
				.authWithPassword(body.email, body.password);

			const responseData = response.record;

			userData = {
				id: responseData.id,
				username: responseData.username,
				email: responseData.email,
			};
		} catch (error) {
			return reply.code(500).send(error);
		}

		const token = createToken(userData);

		app.log.info(token);

		return reply.code(201).send(token);
	});

	app.log.info("User routes registered");
}
