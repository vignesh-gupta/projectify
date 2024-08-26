import { Kafka } from "@upstash/kafka";

const kafka = new Kafka({
  url: "https://close-lemming-8719-us1-rest-kafka.upstash.io",
  username: "Y2xvc2UtbGVtbWluZy04NzE5JORTVVCpRJBDTSgTyjtvck4AudXIBbq3psRzqt0",
  password: "NDgyOTRhNmItMWFlZS00NGRkLWI3MzItZjc4ZDlhM2U0ZDc2",
});

export const GET = async () => {
  const p = kafka.producer();

  // Objects will get serialized using "JSON.stringify"
  const message = { hello: "world" };
  const res = await p.produce("delete-childs", message);

  console.log(res);

  return Response.json({ message: "Message sent", res });
};
