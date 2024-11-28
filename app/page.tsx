import prisma from "@/app/lib/db";
import PersonalProjects from "@/components/AllProjects";
// import PersonalProjects from "@/components/AllProjects";
import { Hero } from "@/components/Hero";
import StakeProjects from "@/components/StakeProjects";
import { userDbName, userLoginId } from "@/lib/helper";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

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

export default async function Home() {
  // const user = await getData(userDbName);

  // let admin = false;
  // if(userLoginId === user?.id) {
  //   admin=true;
  // }
  const { getUser } = getKindeServerSession();
  const data = await getUser();
  const user = await getData(userLoginId);
  const logUser = await getData(data.id);
  let admin = false;
  if (logUser?.admin) {
     admin = true;
  }
  console.log();
  
  return (
    <div className="p-4">
      <Hero user={user} admin={admin} />
      <StakeProjects username={user?.userName || ""}/>
      <PersonalProjects username={user?.userName || ""}/>
    </div>
  );
}
