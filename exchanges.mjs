import amqp from 'amqplib';

async function exchange() {
    const conn = await amqp.connect({
        hostname: 'localhost',
        port: 5672,
        username: 'rabbitmq',
        password: 'rabbitmq',
    });

    const channel = await conn.createChannel();

    await channel.assertExchange('exchange', 'direct');

    await channel.assertQueue('fila_notification', {
        durable: true
    });

    channel.bindQueue('fila_notification', 'exchange', 'novaMensagem');

    channel.publish('exchange', 'novaMensagem', Buffer.from('Teste'));

    await channel.close();
    await conn.close();
}

exchange();
