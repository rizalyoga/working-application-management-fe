import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserAvatarUploader } from "@/components/avatar/UserAvatarUploader";
import useProfileUserStore from "@/stores/useProfileStore";

interface UserProfileCardProps {
  className?: string;
}

const UpdateProfilePhotoForm = ({ className }: UserProfileCardProps) => {
  const userProfileStore = useProfileUserStore();

  return (
    <Card className={`${className} max-w-2xl mx-auto dark:bg-[#121212]`}>
      <CardHeader>
        <h3 className="text-lg font-bold -mb-4 text-center">
          {userProfileStore.name}
        </h3>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <UserAvatarUploader
          initialAvatarUrl={
            userProfileStore.profile_picture_url
              ? userProfileStore.profile_picture_url
              : "https://github.com/shadcn.png"
          }
        />
      </CardContent>
    </Card>
  );
};

export default UpdateProfilePhotoForm;
