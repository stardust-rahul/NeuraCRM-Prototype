import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CallCentre from "./CallCentre";
import EmailComposer from "./EmailComposer";
import MeetingScheduler from "./MeetingScheduler";
import { Phone, Mail, Calendar } from "lucide-react";
import clsx from "clsx";
import { useState } from "react";

export default function ActivityCentre({ lead }) {
  const [activeTab, setActiveTab] = useState("call");
  // You can later make this color customizable via props or context
  const activeColor = "bg-blue-600 text-white";
  const inactiveColor = "bg-gray-100 text-gray-700";

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="call" className={clsx(activeTab === "call" ? activeColor : inactiveColor, "rounded-none font-medium flex items-center justify-center gap-2")}>
          <Phone className="w-4 h-4 mr-2" /> Call
        </TabsTrigger>
        <TabsTrigger value="email" className={clsx(activeTab === "email" ? activeColor : inactiveColor, "rounded-none font-medium flex items-center justify-center gap-2")}>
          <Mail className="w-4 h-4 mr-2" /> Email
        </TabsTrigger>
        <TabsTrigger value="meeting" className={clsx(activeTab === "meeting" ? activeColor : inactiveColor, "rounded-none font-medium flex items-center justify-center gap-2")}>
          <Calendar className="w-4 h-4 mr-2" /> Meeting
        </TabsTrigger>
      </TabsList>
      <TabsContent value="call">
        <CallCentre lead={lead} />
      </TabsContent>
      <TabsContent value="email">
        <EmailComposer lead={lead} />
      </TabsContent>
      <TabsContent value="meeting">
        <MeetingScheduler lead={lead} />
      </TabsContent>
    </Tabs>
  );
} 