/* eslint-disable turbo/no-undeclared-env-vars */
import { KafkaMessage } from "@repo/backend/lib/types";
import { Kafka, logLevel } from "kafkajs";

const kafka = new Kafka({
  brokers: [process.env.UPSTASH_KAFKA_BROKER!],
  connectionTimeout: 10000,
  ssl: true,
  sasl: {
    mechanism: "scram-sha-256",
    username: process.env.KAFKA_USERNAME!,
    password: process.env.KAFKA_PASSWORD!,
  },
  logLevel: logLevel.ERROR,
}).producer();

export const produceMessage = async (message: KafkaMessage) => {
  try {
    await kafka.connect();
    await kafka.send({
      topic: "delete-child",
      messages: [{ value: JSON.stringify(message) }],
    });
  } catch (error) {
    console.error(error);
  } finally {
    await kafka.disconnect();
  }
};
