import DashboardLayout from "@/components/layout/DashboarLayout";
import ProfileUserForm from "@/components/forms/ProfileUserForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProfilePage = () => {
  return (
    <DashboardLayout>
      <div className="mt-28 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle>User Profile</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="mt-8 flex flex-col gap-8 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Photo Profile</CardTitle>
          </CardHeader>
          <CardContent>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet odio
            quaerat optio obcaecati accusantium modi vero eligendi eum quos
            nesciunt. Cupiditate cumque ab hic dolorum sapiente, necessitatibus
            reprehenderit ipsum consectetur.
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
            <CardTitle>Change Password</CardTitle>
          </CardHeader>
          <CardContent>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet odio
            quaerat optio obcaecati accusantium modi vero eligendi eum quos
            nesciunt. Cupiditate cumque ab hic dolorum sapiente, necessitatibus
            reprehenderit ipsum consectetur.
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};
export default ProfilePage;
