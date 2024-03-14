import path from 'node:path'
import envSchema from 'env-schema'
import S from 'fluent-json-schema'

export function loadConfig(): void {
	const result = require('dotenv').config({
		path: path.join(__dirname, '..', '.env'),
	})

	if (result.error) {
		throw new Error(result.error)
	}

	envSchema({
		data: result.parsed,
		schema: S.object()
			.prop(
				'NODE_ENV',
				S.string().enum(['development', 'testing', 'production']).required(),
			)
			.prop('API_PORT', S.string().required())
			.prop('DATABASE_URL', S.string().required()),
	})
}
