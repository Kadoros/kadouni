import AddDocumentBtn from "@/components/Editor/AddDocumentBtn";
import { DeleteModal } from "@/components/Editor/DeleteModal";
import Header from "@/components/Editor/Header";
import Notifications from "@/components/Editor/Notifications";
import { Button } from "@/components/ui/button";
import { getDocuments } from "@/lib/actions/room.actions";
import { dateConverter } from "@/lib/utils";
// import { SignedIn, UserButton } from '@clerk/nextjs'

import { currentUser } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const Home = async () => {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const roomDocuments = await getDocuments(user.email!);

  return (
    <main className="home-container">
      <div className="mt-9 w-full">
        {roomDocuments.data.length > 0 ? (
          <div className="document-list-container">
            <div className="document-list-title">
              <h3 className="text-28-semibold">All documents</h3>
              <AddDocumentBtn userId={user.id!} email={user.email!} />
            </div>
            <ul className="document-ul">
              {roomDocuments.data.map(({ id, metadata, createdAt }: any) => (
                <li key={id} className="document-list-item">
                  <Link
                    href={`/documents/${id}`}
                    className="flex flex-1 items-center gap-4"
                  >
                    <div className="hidden rounded-md bg-dark-500 p-2 sm:block">
                      <Image
                        src="/assets/icons/doc.svg"
                        alt="file"
                        width={40}
                        height={40}
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="line-clamp-1 text-lg">{metadata.title}</p>
                      <p className="text-sm font-light text-slate-700">
                        Created about {dateConverter(createdAt)}
                      </p>
                    </div>
                  </Link>
                  <DeleteModal roomId={id} />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="document-list-empty">
            <Image
              src="/assets/icons/doc.svg"
              alt="Document"
              width={40}
              height={40}
              className="mx-auto"
            />

            <AddDocumentBtn userId={user.id!} email={user.email!} />
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
