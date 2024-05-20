import amqp from "amqplib";

async function main() {
    const connection = await amqp.connect({
        hostname: 'localhost',
        port: 5672,
        username: 'rabbitmq',
        password: 'rabbitmq'
    });
  
    const channel = await connection.createChannel();
  
    await channel.assertQueue('minha_fila', { durable: true });
  
    let i=1;

    for(let i=0; i<1000;i++){
        channel.publish('', 'minha_fila', Buffer.from(`Minha mensagem ${i}`))
    };
    
    await channel.close();
    await connection.close();
}

main();