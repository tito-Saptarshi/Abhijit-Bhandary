"use server";

// https://ruizdelcarmen.me/

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import prisma from "../app/lib/db";

export async function updateUserInfo(prevState: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }
  console.log();

  const username = formData.get("username") as string;
  const firstname = formData.get("firstname") as string;
  const lastname = formData.get("lastname") as string;
  // const bio = formData.get("bio") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const pitch = formData.get("pitch") as string;
  const socialLinkedIn = formData.get("sociallinkedin") as string;
  const socialMail = formData.get("socialmail") as string;
  const socialGithub = formData.get("socialgithub") as string;
  const socialOtherLink = formData.get("socialotherlink") as string;

  try {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        userName: username,
        firstName: firstname,
        lastName: lastname,
        bio: pitch,
        imageUrl: imageUrl,
        socialLinkedIn: socialLinkedIn,
        socialMail: socialMail,
        socialGithub: socialGithub,
        socialOtherLink: socialOtherLink,
      },
    });

    return {
      message: "Succesfully Updated",
      status: "green",
    };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return {
          message: "This username is already used",
          status: "error",
        };
      }
    }
    throw e;
  }
}

export async function createProject(
  prevState: unknown,
  formData: FormData,
  pitch: string,
  imageUrl: string
) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }
  console.log();

  const name = formData.get("name") as string;
  const tools_used = formData.get("tools_used") as string;
  const project_type = formData.get("project_type") as string;
  const project_link = formData.get("project_link") as string;
  const other_link = formData.get("other_link") as string;
  const github_link = formData.get("github_link") as string;
  const other_type = formData.get("other_type") as string;
  // const bio = formData.get("bio") as string;
  // const imageUrl = formData.get("imageUrl") as string;

  try {
    await prisma.project.create({
      data: {
        userId: user.id,
        name: name,
        tools_used: tools_used,
        project_type: project_type,
        project_link: project_link,
        other_link: other_link,
        github_link: github_link,
        imageUrl: imageUrl,
        details: pitch,
        only_type: other_type,
      },
    });

    return {
      message: "Succesfully Updated",
      status: "green",
    };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return {
          message: "This username is already used",
          status: "error",
        };
      }
    }
    throw e;
  }
}

export async function createStakeProject(
  prevState: unknown,
  formData: FormData,
  pitch: string,
  imageUrl: string
) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }
  console.log();

  const name = formData.get("name") as string;
  const tools_used = formData.get("tools_used") as string;
  const project_type = formData.get("project_type") as string;
  const project_link = formData.get("project_link") as string;
  const other_link = formData.get("other_link") as string;
  const github_link = formData.get("github_link") as string;
  const other_type =  formData.get("other_type") as string;
  // const bio = formData.get("bio") as string;
  // const imageUrl = formData.get("imageUrl") as string;

  try {
    await prisma.stakeholderProject.create({
      data: {
        userId: user.id,
        name: name,
        tools_used: tools_used,
        project_type: project_type,
        project_link: project_link,
        other_link: other_link,
        github_link: github_link,
        imageUrl: imageUrl,
        details: pitch,
        only_type: other_type,
      },
    });

    return {
      message: "Succesfully Updated",
      status: "green",
    };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return {
          message: "This username is already used",
          status: "error",
        };
      }
    }
    throw e;
  }
}

export async function uplaodCertificate(
  prevState: unknown,
  formData: FormData,
  imageUrl: string
) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }
  console.log();

  const name = formData.get("name") as string;
  const post_link = formData.get("post_link") as string;
  // const bio = formData.get("bio") as string;
  // const imageUrl = formData.get("imageUrl") as string;

  try {
    await prisma.certificates.create({
      data: {
        userId: user.id,
        name: name,
        imageUrl: imageUrl,
        link: post_link,
      },
    });

    return {
      message: "Succesfully Updated",
      status: "green",
    };
  } catch (e) {
    // if (e instanceof Prisma.PrismaClientKnownRequestError) {
    //   if (e.code === "P2002") {
    //     return {
    //       message: "This username is already used",
    //       status: "error",
    //     };
    //   }
    // }
    console.log(e);
    throw e;
  }
}

export async function sendText(
  prevState: unknown,
  formData: FormData,
) {

  const id = formData.get("userId") as string;
  const mail = formData.get("mail") as string;
  const text = formData.get("text") as string;
  
  console.log("userId: " + id);
  console.log("mail: " + mail);
  console.log("text: " + text);
  


  try {
    await prisma.inbox.create({
      data: {
       userId: id,
       mail: mail,
       text: text,
      },
    });

    return {
      message: "Succesfully Updated",
      status: "green",
    };
  } catch (e) {
    // if (e instanceof Prisma.PrismaClientKnownRequestError) {
    //   if (e.code === "P2002") {
    //     return {
    //       message: "This username is already used",
    //       status: "error",
    //     };
    //   }
    // }
    console.log(e);
    throw e;
  }
}