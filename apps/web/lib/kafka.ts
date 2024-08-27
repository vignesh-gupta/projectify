/* eslint-disable turbo/no-undeclared-env-vars */
import { Kafka } from "@upstash/kafka";

const kafka = new Kafka({
  url: process.env.UPSTASH_KAFKA_REST_URL!,
  username: process.env.UPSTASH_KAFKA_REST_USERNAME!,
  password: process.env.UPSTASH_KAFKA_REST_PASSWORD!,
});

type TMessage = {
  resource: string;
  id: string;
  action: string;
};

export const produceMessage = async (message: TMessage) => {
  const kafkaProducer = kafka.producer();
  return await kafkaProducer.produce("delete-child", message);
};
