const amqp = require('amqplib')
const rabbitClient = require('./')

const defaultDurability = { durable: true }

const setup = async () => {
	console.log('setup.start')

	const channel = await rabbitClient() 
	
	// create the processing exchage
	await channel.assertExchange('processing', 'direct', defaultDurability)

	// create the queues
	await channel.assertQueue('processing.requests', defaultDurability)
	await channel.assertQueue('processing.results', defaultDurability)

	// binding the queues
	await channel.bindQueue('processing.requests', 'processing', 'request')
	await channel.bindQueue('processing.results', 'processing', 'result')
	
	console.log('setup.success')
	process.exit()
}

setup()
	.then(console.log)
	.catch(console.error)

module.exports = {
	setup,
}

