import { getAdminMessages } from "@/components/helper/getAdminMessages";
import MessagesCard from "../_component/MessagesCards";
import MessagesDataTable from "../_component/MessagesDataTable";

export default async function MessagesPage() {
  const rawMessages = await getAdminMessages();

  const messages = rawMessages.map((m) => ({
    ...m,
    formattedDate: new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(m.createdAt)),
  }));

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
            <MessagesDataTable messages={messages} />
          </div>

          <div className="md:hidden">
            <MessagesCard messages={messages} />
          </div>
        </>
      )}
    </div>
  );
}
