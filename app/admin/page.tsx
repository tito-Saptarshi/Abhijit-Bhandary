import {
  getKindeServerSession,
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function SimpleAdminPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Admin Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          {user ? (
            <>
              <Button asChild>
                <LogoutLink className="w-full">Logout</LogoutLink>
              </Button>
              {/* <Button variant="secondary" asChild>
                <RegisterLink>Sign up</RegisterLink>
              </Button> */}
              <Button variant="outline"><Link href={"/admin/panel"}>Admin Panel</Link></Button>
            </>
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

          {/* <Button className="w-full" size="lg" asChild>
            <Link href={""}>Update Profile</Link>
          </Button>
          <Button className="w-full" size="lg">
            Create Post
          </Button>
          <Button className="w-full" size="lg">
            View Messages
          </Button> */}
        </CardContent>
      </Card>
    </div>
  );
}
