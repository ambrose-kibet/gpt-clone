import { fetchOrGenerateTokens } from '@/utils/actions';
import { UserProfile, auth } from '@clerk/nextjs';

const ProfilePage = async () => {
  const { userId } = auth();
  const tokenCount = await fetchOrGenerateTokens(userId as string);

  return (
    <div>
      <h2 className="font-extrabold text-2xl mb-8 ml-8">
        Token Amount: {tokenCount}
      </h2>
      <UserProfile />;
    </div>
  );
};
export default ProfilePage;
