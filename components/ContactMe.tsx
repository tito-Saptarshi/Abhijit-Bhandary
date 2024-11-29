"use client";

import { useActionState, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";
import { sendText } from "@/lib/actions";

const initialState = {
  message: "",
  status: "",
};

export function ContactMe({ userId }: { userId: string }) {
  // const [message, setMessage] = useState("");
  const [state, formAction] = useActionState(sendText, initialState);
  return (
    <div className="pt-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Contact Me</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Interested in collaborating or have feedback on my portfolio?
              I&apos;d love to hear from you! Whether you have recommendations,
              opportunities, or just want to send a kind message, let&apos;s
              connect.
            </p>

            {/* <div className="flex items-center space-x-2">
              <Checkbox
                id="like"
                checked={sendLike}
                onCheckedChange={(checked: any) => setSendLike(checked as boolean)}
              />
              <label
                htmlFor="like"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Or simply shoot me a <Heart className="w-4 h-4 inline text-red-500" />!
              </label>
            </div> */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="default" className="w-full">
                  Contact
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when
                    you&apos;re done.
                  </DialogDescription>
                </DialogHeader>
                <form action={formAction}>
                  <input type="hidden" value={userId} name="userId" />
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="mail" className="text-right">
                        Email
                      </Label>
                      <Input id="mail" name="mail" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="text" className="text-right">
                        message
                      </Label>
                      <Textarea id="text" name="text" className="col-span-3" />
                    </div>
                  </div>
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
