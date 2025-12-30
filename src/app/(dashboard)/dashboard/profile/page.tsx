import { loadCurrentUser } from "./actions";
import { ProfilePageClient } from "./profile-page-client";

export const dynamic = "force-dynamic";

// eslint-disable-next-line no-restricted-syntax
export default async function ProfilePage() {
  const profile = await loadCurrentUser();

  return <ProfilePageClient initialProfile={profile} />;
}
