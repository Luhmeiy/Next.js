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
		const token = app.jwt.sign(
			{ ...userData },
			{
				sub: userData.id,
				expiresIn: "7 days",
			}
		);

		return token;
	};

	const login = async (
		email: string,
		password: string,
		reply: FastifyReply
	) => {
		let userData: UserData;

		try {
			const response = await pb
				.collection("users")
				.authWithPassword(email, password);

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

		return reply.code(201).send(token);
	};

	app.post(
		"/register",
		async (request: FastifyRequest<RequestData>, reply) => {
			const body = request.body;

			try {
				await pb.collection("users").create(body);

				await login(body.email, body.password, reply);
			} catch (error) {
				return reply.code(500).send(error);
			}
		}
	);

	app.post("/login", async (request: FastifyRequest<RequestData>, reply) => {
		const body = request.body;

		await login(body.email, body.password, reply);
	});

	app.log.info("User routes registered");
}
