import amqp from "amqplib";
import { randomUUID } from "crypto";

async function exchangeFanout() {
    const conn = await amqp.connect({
        hostname: "localhost",
        port: 5672,
        username: "rabbitmq",
        password: "rabbitmq",
        vhost: 'fanout',
    });

    const channel = await conn.createChannel();

    await channel.assertExchange('notifications', 'fanout');
    await channel.assertQueue('email_notification');
    await channel.assertQueue('sms_notification');
    await channel.assertQueue('push_notification');

    await channel.bindQueue('email_notification', 'notifications', '');
    await channel.bindQueue('sms_notification', 'notifications', '');
    await channel.bindQueue('push_notification', 'notifications', '');

    channel.publish('notifications', '', Buffer.from(`Identificamos uma atividade suspeita na sua conta. - ID: ${randomUUID()}`))

    await channel.close();
    await conn.close();
}

exchangeFanout();