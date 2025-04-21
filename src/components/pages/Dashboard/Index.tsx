import DashboardLayout from "@/components/layout/DashboarLayout";
import useProfileUserStore from "@/stores/useProfileStore";

const DashboardIndex = () => {
  const { name, email, phone_number } = useProfileUserStore();

  return (
    <DashboardLayout>
      <div className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1>Dashboard Page</h1>

        <p>{name}</p>
        <p>{email}</p>
        <p>{phone_number}</p>
      </div>
    </DashboardLayout>
  );
};

export default DashboardIndex;
