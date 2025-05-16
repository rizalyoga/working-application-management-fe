import DashboardLayout from "@/components/layout/DashboarLayout";
import ProfileUserForm from "@/components/forms/ProfileUserForm";
import EditPasswordForm from "@/components/forms/EditPasswordForm";
import UpdateProfilePhotoForm from "@/components/forms/UpdateProfilePhotoForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useProfileUserStore from "@/stores/useProfileStore";

const ProfilePage = () => {
  const userProfileStore = useProfileUserStore();
  return (
    <DashboardLayout>
      <div className="mt-8 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <h3 className="font-bold ml-6">
            {userProfileStore.name.toUpperCase()}
          </h3>
        </Card>
      </div>
     
      <div className="mt-8 flex flex-col gap-8 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Photo Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <UpdateProfilePhotoForm />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Profile Data</CardTitle>
          </CardHeader>
          <CardContent>
            <ProfileUserForm />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
          </CardHeader>
          <CardContent>
            <EditPasswordForm />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};
export default ProfilePage;
