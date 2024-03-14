import type { FastifyInstance } from 'fastify'
import { prisma } from '../prisma'

export async function pokemonRoute(server: FastifyInstance) {
	server.get('/', async (request, reply) => {
		try {
			const pokemons = await prisma.pokemon.findMany()
			reply.status(200).send(pokemons)
		} catch (e) {
			reply.status(500).send(e)
		}
	})

	server.get<{ Params: { id: number | string } }>(
		'/:id',
		async (request, reply) => {
			try {
				const pokemon = await prisma.pokemon.findUnique({
					where: {
						id: Number(request.params.id),
					},
				})

				if (!pokemon) {
					reply.status(404).send()
				} else {
					reply.status(200).send(pokemon)
				}
			} catch (e) {
				reply.status(500).send()
			}
		},
	)
}
