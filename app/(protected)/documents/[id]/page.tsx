import CollaborativeRoom from "@/components/Editor/CollaborativeRoom";
import { getDocument } from "@/lib/actions/room.actions";
import { getUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

const Document = async ({ params: { id } }: SearchParamProps) => {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const room = await getDocument({
    roomId: id,
    userId: user.email!,
  });

  if (!room) redirect("/");

  const userIds = Object.keys(room.usersAccesses);
  const users = await getUsers({ userIds });
  console.log(users);
  const usersData = users.map((user: User) => {
    console.log(user);
    if (!user) {
      return; // Handle null user
    }
    return {
      ...user,
      userType: room.usersAccesses[user.email]?.includes("room:write")
        ? "editor"
        : "viewer",
    };
  });

  const currentUserType = room.usersAccesses[
    user.email!
  ]?.includes("room:write")
    ? "editor"
    : "viewer";

  return (
    <main className="flex w-full flex-col items-center">
      <CollaborativeRoom
        roomId={id}
        roomMetadata={room.metadata}
        users={usersData}
        currentUserType={currentUserType}
      />
    </main>
  );
};

export default Document;
