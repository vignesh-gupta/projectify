import { produceMessage } from "@/lib/kafka";


export const POST = async (req: Request) => {
  const { resource, id, action } = await req.json();

  const res = await produceMessage({ resource, id, action });

  return Response.json({ message: "Message sent", res });
};
