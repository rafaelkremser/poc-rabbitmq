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

    await channel.assertQueue('push_notification', {
        durable: true,
    });

    await channel.assertQueue('email_notification', {
        durable: true,
    });

    await channel.bindQueue('push_notification', 'exchange', 'novoCurso');
    await channel.bindQueue('email_notification', 'exchange', 'send.#');
    await channel.bindQueue('email_notification', 'exchange', 'diploma');

    channel.publish('exchange', 'diploma', Buffer.from("Teste mensagem"));

    await channel.close();
    await conn.close();
}

exchange();