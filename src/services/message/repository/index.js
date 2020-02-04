const amqp = require('amqplib')

const { CLOUDAMQP_URL = 'amqp://localhost' } = process.env
const defaultDurability = { durable: true }

const rabbitClient = async () => {
  console.log('rabbitClient.start')

  const connection = await amqp.connect(CLOUDAMQP_URL)
  const channel = await connection.createChannel()
	
	console.log('rabbitClient.createChannel.success')
	return channel
}

module.exports = rabbitClient 

