import fastify from 'fastify'
import cors from '@fastify/cors'
import pino from 'pino'
import { loadConfig } from './config'
import { healthCheckRoute, pokemonRoute } from './routes'

loadConfig()

const port = process.env.API_PORT ? Number(process.env.API_PORT) : 5000

const startServer = async () => {
	try {
		const server = fastify({
			logger: pino({ level: 'info' }),
		})
		server.setErrorHandler((error, request, reply) => {
			server.log.error(error)
		})

		server.register(cors, {
			origin: false
		})
		server.register(healthCheckRoute, { prefix: '/health-check' })
		server.register(pokemonRoute, { prefix: '/pokemon' })

		server.get('/', (request, reply) => {
			reply.send({ name: 'devops_api_node' })
		})

		if (process.env.NODE_ENV === 'production') {
			for (const signal of ['SIGINT', 'SIGTERM']) {
				process.on(signal, () =>
					server.close().then((err) => {
						console.log(`close application on ${signal}`)
						process.exit(err ? 1 : 0)
					}),
				)
			}
		}

		const logger  = pino()
		logger.info(`You are running in ${process.env.NODE_ENV} mode.`)

		await server.listen({ port, host: "0.0.0.0" })
	} catch (e) {
		console.error(e)
	}
}

process.on('unhandledRejection', (e) => {
	console.error(e)
	process.exit(1)
})

startServer()
