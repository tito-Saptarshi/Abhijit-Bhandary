import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Heart } from 'lucide-react'

import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/app/lib/db";
import { ContactMe } from "./ContactMe";

async function getData(userName: string) {
  noStore();
  const data = await prisma.user.findUnique({
    where: {
      userName: userName,
    },
  });

  return data;
}

async function getProjects(id: string) {
  noStore();
  const data = await prisma.certificates.findMany({
    where: {
      userId: id,
    },
  });

  return data;
}

export async function CertificationsPage({ username }: { username: string }) {
  const data = await getData(username);
  const certificates = await getProjects(data?.id || "");

  //   const [sendLike, setSendLike] = useState(false)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Certifications</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {certificates.map((cert) => (
          <Card key={cert.id} className="overflow-hidden max-h-[300px]">
            <CardHeader>
              <CardTitle className="text-lg">
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-blue-600"
                >
                  {cert.name}
                </a>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Dialog>
              <DialogTitle></DialogTitle>
                <DialogTrigger asChild>
                  <div className="aspect-[4/3] relative overflow-hidden rounded-md cursor-pointer">
                    <img
                      src={cert.imageUrl}
                      alt={`${cert.imageUrl} certificate`}
                      className="object-cover transition-transform hover:scale-105"
                    />
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <img
                    src={cert.imageUrl ?? ""}
                    alt={`${cert.name} certificate`}
                    className="w-full h-auto"
                  />
                </DialogContent>
              </Dialog>
              {/* <div className="mt-4 text-sm text-muted-foreground">
                <p>Issued by: {cert.issuer}</p>
                <p>Year: {cert.date}</p>
              </div> */}
            </CardContent>
          </Card>
        ))}
      </div>

      <ContactMe />
    </div>
  );
}
