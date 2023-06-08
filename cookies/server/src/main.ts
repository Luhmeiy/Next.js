import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import "dotenv/config";

import { userRoutes } from "./routes/userRoutes";
import { messageRoutes } from "./routes/messageRoutes";

const app = Fastify({
	logger: true,
});

app.register(cors, {
	origin: true,
});
app.register(jwt, { secret: process.env.JWT_SECRET! });

app.register(userRoutes, { prefix: "/users" });
app.register(messageRoutes, { prefix: "/messages" });

app.listen({ port: 3333, host: "0.0.0.0" }, (err) => {
	if (err) throw err;
});
