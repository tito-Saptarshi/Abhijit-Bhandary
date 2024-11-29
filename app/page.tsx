import prisma from "@/app/lib/db";
import PersonalProjects from "@/components/AllProjects";
import { CertificationsPage } from "@/components/Certificates";
// import PersonalProjects from "@/components/AllProjects";
import { Hero } from "@/components/Hero";
import StakeProjects from "@/components/StakeProjects";
import { userLoginId } from "@/lib/helper";
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

async function getAdminData() {
  noStore();
  const data = await prisma.admin.findFirst({
    where: {
      order: 0,
    },
  });

  return data;
}

export default async function Home() {
  const adminDetails = await getAdminData();
  const user = await getData(adminDetails?.userId ?? "");
  console.log("user: " + user);
  

  // const { getUser } = getKindeServerSession();
  // const kindeUser = await getUser();

  // const allUser = await getData(kindeUser.id ?? "");
  // console.log("alluser: " + allUser);
  let admin = false;
  if (user?.admin) {
    admin = true;
  }

  return (
    <div className="p-4">
      <Hero user={user} admin={admin} />
      <StakeProjects username={user?.userName || ""} type="stake" />
      <PersonalProjects username={user?.userName || ""} type="personal" />
      <CertificationsPage username={user?.userName || ""} />
    </div>
  );
}
