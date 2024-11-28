"use client";
import {
  getKindeServerSession,
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export async function AdminButton() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Admin</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Enter Code</DialogTitle>
          <DialogDescription>Enter secret code</DialogDescription>
        </DialogHeader>
        <div className="flex justify-center items-center space-x-2">
          {user ? (
            <Button asChild>
              <LogoutLink className="w-full">Logout</LogoutLink>
            </Button>
          ) : (
            <>
              <Button variant="secondary" asChild>
                <RegisterLink>Sign up</RegisterLink>
              </Button>
              <Button asChild>
                <LoginLink>Log in</LoginLink>
              </Button>
            </>
          )}
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
