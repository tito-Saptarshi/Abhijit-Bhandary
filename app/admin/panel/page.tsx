import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SimpleAdminPage() {
  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Admin Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <Button className="w-full" size="lg" asChild>
            <Link href={"/admin/update"}>Update Profile</Link>
          </Button>
          <Button className="w-full" size="lg">
            <Link href={"/admin/create"}>Create Personal Project</Link>
          </Button>
          <Button className="w-full" size="lg">
            <Link href={"/admin/createStake"}>Create Stakeholder Project</Link>
          </Button>
          <Button className="w-full" size="lg">
            <Link href={"/admin/upload-certificate"}>Upload Certificate</Link>
          </Button>
          <Button className="w-full" size="lg">
            <Link href={"/admin/viewtext"}>View Messages</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
