/* eslint-disable turbo/no-undeclared-env-vars */
import { KafkaMessage } from "@repo/backend/lib/types";
import { Kafka } from "@upstash/kafka";

const kafka = new Kafka({
  url: process.env.UPSTASH_KAFKA_REST_URL!,
  username: process.env.UPSTASH_KAFKA_REST_USERNAME!,
  password: process.env.UPSTASH_KAFKA_REST_PASSWORD!,
}).producer();

export const produceMessage = async (message: KafkaMessage) => {
  return await kafka.produce("delete-child", message);
};
