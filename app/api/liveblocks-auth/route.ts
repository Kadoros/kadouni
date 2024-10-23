import { liveblocks } from "@/lib/liveblocks";
import { getUserColor } from "@/lib/utils";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  const User = await currentUser();

  if(!User) redirect('/sign-in');

  const { id, name, email, image } = User;

  // Get the current user from your database
  const user = {
    id:id,
    info: {
      id:id!,
      name: `${name}`!,
      email: email!,
      avatar: image!,
      color: getUserColor(id!.toString()),
    }
  }

  // Identify the user and return the result
  const { status, body } = await liveblocks.identifyUser(
    {
      userId: user.info.email!,
      groupIds: [],
    },
    { userInfo: user.info },
  );

  return new Response(body, { status });
}