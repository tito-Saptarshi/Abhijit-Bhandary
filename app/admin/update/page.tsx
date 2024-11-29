// import prisma from "@/app/lib/db";
// import { ProfileForm } from "@/components/ProfileForm";
// import { Separator } from "@/components/ui/separator";
// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
// import { unstable_noStore as noStore } from "next/cache";
// import { redirect } from "next/navigation";

// async function getData(userName: string) {
//   noStore();
//   const data = await prisma.user.findUnique({
//     where: {
//       id: userName,
//     },
//   });

//   return data;
// }

// export default async function page() {
//     const { getUser } = getKindeServerSession();
//     const data = await getUser();
//     const user = await getData(data.id);

// //   if (!currUser) redirect(`/profile/${params.id}`);

// //   if (currUser.id !== user?.id) {
// //     const newData = await getData(currUser.id);
// //     const userName = newData?.userName;
// //     return redirect(`profile/${userName}`);
// //   }
// console.log("user admin details: " + user?.admin);

// if(!user?.admin) {
//     return redirect("/");
// }
//   return (
//     <>
//       <div className="flex justify-between items-center mb-6 ml-5 pt-4">
//         {/* <div>
//           <h1 className="text-2xl font-bold">Profile Page</h1>
//           <p className="text-muted-foreground">
//             Update your profile information.
//           </p>
//         </div> */}
//       </div>
//       <Separator className="mt-10 mb-2 " />
//       <ProfileForm
//         userName={user?.userName}
//         bio={user?.bio}
//         firstName={user?.firstName}
//         lastName={user?.lastName }
//         imageUrl={user?.imageUrl}
//         socialLinkedIn={user?.socialLinkedIn}
//         socialMail={user?.socialMail}
//         socialGithub={user?.socialGithub}
//         socialOtherLink={user?.socialOtherLink}
//       />
//     </>
//   );
// }


import prisma from "@/app/lib/db";
import { ProfileForm } from "@/components/ProfileForm";
import { Separator } from "@/components/ui/separator";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

// Mark the page as dynamic
export const dynamic = 'force-dynamic';

async function getData(userName: string | undefined) {
  if (!userName) return null; // Handle undefined userName gracefully
  const data = await prisma.user.findUnique({
    where: { id: userName },
  });
  return data;
}

export default async function page() {
  const { getUser } = getKindeServerSession();
  const data = await getUser();

  if (!data?.id) {
    return redirect("/"); // Redirect if the user is not logged in
  }

  const user = await getData(data.id);

  console.log("user admin details:", user?.admin);

  if (!user?.admin) {
    return redirect("/"); // Redirect if the user is not an admin
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6 ml-5 pt-4"></div>
      <Separator className="mt-10 mb-2 " />
      <ProfileForm
        userName={user?.userName}
        bio={user?.bio}
        firstName={user?.firstName}
        lastName={user?.lastName}
        imageUrl={user?.imageUrl}
        socialLinkedIn={user?.socialLinkedIn}
        socialMail={user?.socialMail}
        socialGithub={user?.socialGithub}
        socialOtherLink={user?.socialOtherLink}
      />
    </>
  );
}
