const { Kafka, logLevel } = require("kafkajs");
const { postDeleteProject } = require("./service/delete-child");
import { KafkaMessage } from "@repo/backend/lib/types";
import { Response } from "express";
const actuator = require('express-actuator');
const express = require("express");

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

      if (!message.value?.keys) return;

      const messageValue: KafkaMessage = JSON.parse(message.value.toString());

      console.log(messageValue.id);

      switch (messageValue.resource) {
        case "project":
          postDeleteProject(messageValue.id);
          break;

        default:
          break;
      }
    },
  });
};

run().catch((e) => console.error("[consumer] e.message", e));

const app = express();
const port = process.env.PORT || 8080;

app.use(actuator());

app.get("/", (_, res:Response) => {
  res.send("Welcome to the Projectify Kaka consumer!");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
