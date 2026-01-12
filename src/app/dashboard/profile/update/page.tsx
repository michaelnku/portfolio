import PasswordForm from "@/app/dashboard/_component/PasswordForm";
import ProfileForm from "@/app/dashboard/_component/ProfileForm";

const page = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">Update Profile</h1>
        <p className="text-sm text-muted-foreground">
          Manage your personal account information and password.
        </p>
      </header>
      <ProfileForm />
      <PasswordForm />
    </div>
  );
};

export default page;
