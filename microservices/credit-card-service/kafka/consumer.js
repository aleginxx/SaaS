const kafka = require('kafka-node');
const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient({ kafkaHost: process.env.KAFKA_BROKER });
const producer = new kafka.Producer(client);

producer.on('ready', function() {
  console.log('Kafka Producer is connected and ready.');
});

producer.on('error', function(err) {
  console.error('Kafka Producer connection error:', err);
});
const consumer = new Consumer(
    client,
    [{ topic: 'credit-card-added', partition: 0 }],
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
