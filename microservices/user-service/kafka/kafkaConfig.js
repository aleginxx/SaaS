const kafka = require('kafka-node');
const config = require('../config/kafka');

const client = new kafka.KafkaClient({ kafkaHost: config.kafkaServer });

const producer = new kafka.Producer(client);

producer.on('ready', function () {
  console.log('Kafka Producer is ready');
});

producer.on('error', function (err) {
  console.error('Error in Kafka Producer:', err);
});

const kafkaConsumerOptions = {
  kafkaHost: config.kafkaServer,
  groupId: 'solveMyProblem-group',  
  autoCommit: true,
  fetchMaxBytes: 10 * 1024 * 1024,  
};

const consumer = new kafka.ConsumerGroup(kafkaConsumerOptions, config.userTopic);

consumer.on('message', function (message) {
  console.log('Received message from Kafka:', message);
});

consumer.on('error', function (err) {
  console.error('Error in Kafka Consumer:', err);
});

module.exports = { producer, consumer };
