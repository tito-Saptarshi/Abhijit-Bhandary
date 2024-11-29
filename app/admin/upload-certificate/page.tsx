"use client";

import { useActionState, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UploadDropzone } from "@/components/Uploadthing";

import { useToast } from "@/hooks/use-toast";
import { redirect, useRouter } from "next/navigation";
import { uplaodCertificate } from "@/lib/actions";
import { SubmitButton } from "@/components/SubmitButton";

// Define the form schema
const formSchema = z.object({
  name: z.string().min(2, "Project name must be at least 2 characters"),
  post_link: z.string().min(2, "Skills must be at least 2 characters"),

  image: z.string().url("Invalid image URL"),
});

export default function ProjectUploadPage() {
  const { toast } = useToast();
  //   const [imageUrl, setImageUrl] = useState("");

  const [newImage, setNewImage] = useState<string>("");
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",

      post_link: "",
      image: "",
    },
  });

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const result = await uplaodCertificate(prevState, formData, newImage);

      if (result.status == "SUCCESS") {
        toast({
          title: "Success",
          description: "Your startup pitch has been created successfully",
        });

        router.push(`/`);
        return redirect("/");
      }

      return result;
    } catch (error) {
      console.log(error);

      toast({
        title: "Error",
        description: "An unexpected error has occurred",
        variant: "destructive",
      });

      return {
        ...prevState,
        error: "An unexpected error has occurred",
        status: "ERROR",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Upload Your Certificate</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form action={formAction} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cetificate Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter project name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="post_link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Certificate Link</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://github.com/abc.../xyz..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Certificate Image</FormLabel>
                    <FormControl>
                      <UploadDropzone
                        className="ut-button:w-28 ut-allowed-content:hidden"
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          setNewImage(res[0].url);
                        }}
                      />
                    </FormControl>
                    {newImage && (
                      <div className="mt-4">
                        <img
                          src={newImage ?? `https://avatar.vercel.sh/abc`}
                          alt="Uploaded project"
                          className="max-w-full h-auto rounded-lg"
                        />
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <SubmitButton text="Submit Project" />
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
