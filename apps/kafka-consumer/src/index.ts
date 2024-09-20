const { Kafka, logLevel } = require("kafkajs");
const { postDeleteProject } = require("./service/delete-child");
const actuator = require("express-actuator");
const express = require("express");

import { KafkaMessage } from "@repo/backend/lib/types";
import { Response } from "express";

const kafka = new Kafka({
  brokers: [process.env.KAFKA_BROKER!],
  connectionTimeout: 10000,
  ssl: true,
  sasl: {
    mechanism: "scram-sha-256",
    username: process.env.KAFKA_USERNAME!,
    password: process.env.KAFKA_PASSWORD!,
  },
  logLevel: logLevel.ERROR,
});

const consumer = kafka.consumer({ groupId: "group-1" });

const run = async () => {
  await consumer.connect().then(() => console.log("Connected"));
  const topic = process.env.KAFKA_TOPIC || "delete-child";
  await consumer
    .subscribe({
      topic,
      fromBeginning: true,
    })
    .then(() => console.log("Subscribed to topic: "+ topic));

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
      const { id, resource } = messageValue;

      if (!id || !resource) return;

      switch (resource) {
        case "project":
          postDeleteProject(id);
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

app.get("/", (_: any, res: Response) => {
  res.send("Welcome to the Projectify Kaka consumer!");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
