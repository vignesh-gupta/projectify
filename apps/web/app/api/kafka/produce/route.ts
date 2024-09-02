import { produceMessage } from "@/lib/kafka";
import { KafkaMessage } from "@repo/backend/lib/types";

export const POST = async (req: Request) => {
  const body: KafkaMessage = await req.json();

  const res = await produceMessage(body);

  return Response.json({ message: "Message sent", res });
};
