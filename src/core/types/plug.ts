import { FastifyInstance } from "fastify";

export type TPlugFn = (server: FastifyInstance) => void;
