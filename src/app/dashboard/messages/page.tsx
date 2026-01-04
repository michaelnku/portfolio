import { getAdminMessages } from "@/components/helper/getAdminMessages";
import MessagesTable from "../_component/MessagesTable";
import MessagesCard from "../_component/MessagesCards";

export default async function MessagesPage() {
  const messages = await getAdminMessages();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Hire Requests</h1>
        <p className="text-muted-foreground">
          Messages from recruiters and clients
        </p>
      </header>

      {messages.length === 0 ? (
        <p className="text-muted-foreground text-sm">No messages yet.</p>
      ) : (
        <>
          <div className="hidden md:block">
            <MessagesTable messages={messages} />
          </div>

          <div className="md:hidden">
            <MessagesCard messages={messages} />
          </div>
        </>
      )}
    </div>
  );
}
