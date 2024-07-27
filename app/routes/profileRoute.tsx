import ProfileForm from "~/components/features/profile/profileForm";
import { loader } from "~/loaders/profileLoader";

export { loader };

export default function Profile() {
  return <ProfileForm />;
}
