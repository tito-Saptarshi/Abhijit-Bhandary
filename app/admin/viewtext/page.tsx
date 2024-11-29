import prisma from "@/app/lib/db";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { userLoginId } from "@/lib/helper";
import { unstable_noStore as noStore } from "next/cache";

async function getData(id: string) {
  noStore();
  const data = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  return data;
}

async function getText(id: string) {
  noStore();
  const data = await prisma.inbox.findMany({
    where: {
      userId: id,
    },
  });

  return data;
}

interface Message {
  mail: string;
  text: string;
}

export function MessageItem({ mail, text }: Message) {
  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="space-y-2">
          <div>
            <span className="font-semibold text-gray-700">From:</span>
            <span className="ml-2">{mail}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Text:</span>
            <p className="mt-1 whitespace-pre-wrap">{text}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default async function ReceivedMessages() {
  const adminId = userLoginId;
  const data = await getData(adminId);
  const messages = await getText(data?.id ?? "");
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Received Messages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[70vh] pr-4">
            {messages.length > 0 ? (
              messages.map((message) => (
                <MessageItem
                  key={message.id}
                  mail={message.mail}
                  text={message.text}
                />
              ))
            ) : (
              <p className="text-center text-gray-500">
                No messages received yet.
              </p>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
