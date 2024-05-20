import amqp from 'amqplib';

async function main() {
    const connection = await amqp.connect({
        hostname: 'localhost',
        port: 5672,
        username: 'rabbitmq',
        password: 'rabbitmq'
    });

    const channel = await connection.createChannel();
    
    await channel.assertQueue('minha_fila', {
        durable: true
    })

    channel.consume("minha_fila", (data) => {
        console.log(data.content.toString())
        setTimeout(() => {
          channel.ack(data)
        }, 5000)
      });
}

main();