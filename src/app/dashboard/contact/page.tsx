import { getAdminContact } from "@/components/helper/getAdminContact";
import ContactForm from "../_component/ContactForm";

export default async function Page() {
  const contact = await getAdminContact();

  return <ContactForm initialData={contact} />;
}
