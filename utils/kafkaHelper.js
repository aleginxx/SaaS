const kafka = require('kafka-node');
const config = require('../config/kafka');

const client = new kafka.KafkaClient({ kafkaHost: config.kafkaServer });
const producer = new kafka.Producer(client);

const initProducer = () => {
  producer.on('ready', function () {
    console.log('Kafka Producer is ready');
  });

  producer.on('error', function (err) {
    console.error('Error in Kafka Producer:', err);
  });
};

const sendMessage = (topic, message) => {
  const payloads = [
    { topic: topic, messages: JSON.stringify(message) }
  ];

  producer.send(payloads, function (err, data) {
    if (err) {
      console.error('Error sending message to Kafka:', err);
    } else {
      console.log('Message sent successfully:', data);
    }
  });
};

module.exports = {
  initProducer,
  sendMessage
};
