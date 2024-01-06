import { fetchOrGenerateTokens } from '@/utils/actions';
import { UserButton, auth, currentUser } from '@clerk/nextjs';
const MemberProfile = async () => {
  const user = await currentUser();
  const { userId } = auth();
  await fetchOrGenerateTokens(userId as string);
  return (
    <div className="flex gap-2 items-center">
      <UserButton afterSignOutUrl="/" />
      <p className="text-primary">
        {user?.firstName} {user?.lastName}
      </p>
    </div>
  );
};
export default MemberProfile;
