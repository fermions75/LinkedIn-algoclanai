import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/auth";
import { getUser } from "@/lib/data/user-data";
import { TabsContent } from "@radix-ui/react-tabs";
import { MonitorContent } from "./components/monitor-content";


const TrackingPage = async (children) => {
  const session = await auth();
  // const user = await getUser(session.user.email);
  // const { name, email, userType } = user;


  return (
    <MonitorContent />
  );
};

export default TrackingPage;
