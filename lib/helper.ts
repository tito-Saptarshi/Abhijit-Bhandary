
import prisma from "@/app/lib/db";
import { unstable_noStore as noStore } from "next/cache";

async function getData() {
  noStore(); // Prevents caching in a server component

  const data = await prisma.admin.findFirst({
    where: {
      order: 0, // Filter by order value
    },
  });

  return data;
}

export const userLoginId2 = "kp_aa9f07db3b5541638fa62688c25bd504";
const userData = await getData();
export const userLoginId = userData?.userId;
export const userDbName = "madara";

export function extractWords(input: string): string[] {
  // Use a regular expression to match all words (sequences of characters separated by spaces or commas)
  const words = input.split(/[\,]+/);

  // Return the array of words
  return words;
}
