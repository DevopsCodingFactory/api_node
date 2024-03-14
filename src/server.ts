import fastify from 'fastify'
// import mysql from '@fastify/mysql'

const server = fastify()

// MySQL connection
// server.register(mysql, {
//     promise: true,
//     connectionString: ""
// })

server.get('/ping', async (request, reply) => {
    return 'pong\n'
})

server.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
})