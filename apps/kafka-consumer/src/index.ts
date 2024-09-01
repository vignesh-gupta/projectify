import { Kafka, logLevel } from "kafkajs";
import { postDeleteProject } from "./service/delete-child";
import { Message } from "./types";

const kafka = new Kafka({
  brokers: [process.env.UPSTASH_KAFKA_BROKER!],
  connectionTimeout: 10000,
  ssl: true,
  sasl: {
    mechanism: "scram-sha-256",
    username: process.env.UPSTASH_KAFKA_USERNAME!,
    password: process.env.UPSTASH_KAFKA_PASSWORD!,
  },
  logLevel: logLevel.ERROR,
});

const consumer = kafka.consumer({ groupId: "group-1" });

const run = async () => {
  await consumer.connect().then(() => console.log("Connected"));

  await consumer
    .subscribe({ topic: "delete-child", fromBeginning: true })
    .then(() => console.log("Subscribed to topic"));

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        topic,
        value: message?.value?.toString() || "Missing value",
      });

      if(!message.value?.keys) return

      const messageValue: Message = JSON.parse(message.value.toString());

      console.log(messageValue.id);
      

      switch (messageValue.resource) {
        case "project":
          postDeleteProject(messageValue.id)
          break;
      
        default:
          break;
      }
    },
  });
};

run().catch((e) => console.error("[example/consumer] e.message", e));
