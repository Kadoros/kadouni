import { liveblocks } from "@/lib/liveblocks";
import { getUserColor } from "@/lib/utils";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function POST(request: Request) {

  if(!await currentUser()) redirect('/sign-in');

  const { id, name, lastName, emailAddresses, imageUrl } = await currentUser();

  // Get the current user from your database
  const user = {
    id,
    info: {
      id,
      name: `${firstName} ${lastName}`,
      email: emailAddresses[0].emailAddress,
      avatar: imageUrl,
      color: getUserColor(id),
    }
  }

  // Identify the user and return the result
  const { status, body } = await liveblocks.identifyUser(
    {
      userId: (await currentUser()).info.email,
      groupIds: [],
    },
    { userInfo: (await currentUser()).info },
  );

  return new Response(body, { status });
}