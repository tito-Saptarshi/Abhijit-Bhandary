"use client"

import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Textarea } from "./ui/textarea";

export function ContactMe() {
  const [message, setMessage] = useState("");
  return (
    <>
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
            <Textarea
              placeholder="Shoot me a message!"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[100px]"
            />
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
            <Button className="w-full">Share my feedback</Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
