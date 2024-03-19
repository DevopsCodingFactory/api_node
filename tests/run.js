const request = require('supertest')
const pino = require('pino')

const CI = process.env.NODE_ENV === 'testing'

const logger = pino()
const BASE_URL = CI ? 'http://localhost:8000' : 'http://172.20.10.14:8000'

request(BASE_URL)
	.get('/')
	.expect(({ status, body }) => {
		logger.info(`GET ${BASE_URL}/`)

		if (status !== 200) {
			throw new Error('Expected status to be 200')
		}

		if (body.name !== 'devops_api_node') {
			throw new Error("Expected property 'name' to equal 'devops_api_node'")
		}
	})
	.end((err, res) => {
		if (err) {
			logger.error(`∟ ${err.message}`)
			throw Error(err)
		}
		logger.info(`∟ OK ${res.status}`)
	})

request(BASE_URL)
	.get('/health-check')
	.expect(({ status }) => {
		logger.info(`GET ${BASE_URL}/health-check`)

		if (status !== 200) {
			throw new Error('Expected status to be 200')
		}
	})
	.end((err, res) => {
		if (err) {
			logger.error(`∟ ${err.message}`)
			throw Error(err)
		}
		logger.info(`∟ OK ${res.status}`)
	})
