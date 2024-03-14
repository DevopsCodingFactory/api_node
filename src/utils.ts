import { prisma } from './prisma'

export function healthCheck(): Promise<void> {
	return new Promise((resolve, reject) => {
		prisma.$queryRaw`SELECT 1`
			.then(() => {
				resolve()
			})
			.catch(() => {
				reject(new Error('Health check failed'))
			})
	})
}
