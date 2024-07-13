const kafka = require('kafka-node');
const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient({ kafkaHost: process.env.KAFKA_BROKER });

const consumer = new Consumer(
    client,
    [{ topic: 'transaction-added', partition: 0 }],
    { autoCommit: true }

);

consumer.on('message', function (message) {
    console.log('Received message from Kafka:', message);
    // Process the message accordingly (e.g., update local database)
});

consumer.on('error', function (err) {
    console.error('Error in Kafka Consumer:', err);
});

module.exports = { consumer };
