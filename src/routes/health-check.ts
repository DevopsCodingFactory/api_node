import type { FastifyInstance } from 'fastify'
import { healthCheck } from '../utils'

export async function healthCheckRoute(server: FastifyInstance) {
	server.get('/', async (request, reply): Promise<void> => {
		try {
			await healthCheck()
			reply.status(200).send()
		} catch (e) {
			reply.status(500).send()
		}
	})
}
