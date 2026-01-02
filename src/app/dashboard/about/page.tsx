import CreateAboutForm from "../_component/CreateAboutForm";
import { getAdminAbout } from "@/components/helper/getAdminAbout";

export default async function Page() {
  const about = await getAdminAbout();

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <CreateAboutForm initialData={about} />
    </div>
  );
}
