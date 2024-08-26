import { Kafka, logLevel } from 'kafkajs';

const kafka = new Kafka({
  brokers: ['close-lemming-8719-us1-kafka.upstash.io:9092'],
  ssl: true,
  sasl: {
      mechanism: 'scram-sha-256',
      username: 'Y2xvc2UtbGVtbWluZy04NzE5JORTVVCpRJBDTSgTyjtvck4AudXIBbq3psRzqt0',
      password: 'NDgyOTRhNmItMWFlZS00NGRkLWI3MzItZjc4ZDlhM2U0ZDc2'
  },
  logLevel: logLevel.ERROR,
});

const consumer = kafka.consumer({ groupId: 'YOUR_CONSUMER_GROUP' });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'delete-childs', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        topic,
        value: message?.value?.toString() || "Missing value",
      });
    },
  });
};

run().catch(e => console.error('[example/consumer] e.message', e));