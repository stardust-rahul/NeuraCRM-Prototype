import { Button } from "@/components/ui/button";

const GoogleMeetLogo = () => <img src="https://fonts.gstatic.com/s/i/productlogos/meet_2020q4/v1/web-32dp/logo_meet_2020q4_color_2x_web_32dp.png" alt="Google Meet" className="w-5 h-5 mr-2" />;
const MsTeamsLogo = () => <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Microsoft_Teams_logo.svg/2048px-Microsoft_Teams_logo.svg.png" alt="MS Teams" className="w-5 h-5 mr-2" />;
const SlackLogo = () => <img src="https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg" alt="Slack" className="w-5 h-5 mr-2" />;

export default function MeetingScheduler({ lead }) {
    return (
        <div className="space-y-4 pt-4">
            <p className="font-semibold text-sm">Schedule a meeting with {lead.contact || lead.name}.</p>
            <p className="text-muted-foreground text-xs">Select a service to generate a meeting link.</p>
            <div className="flex flex-col gap-2 pt-2">
                <Button variant="outline" className="justify-start">
                    <GoogleMeetLogo />
                    Create Google Meet link
                </Button>
                <Button variant="outline" className="justify-start">
                    <MsTeamsLogo />
                    Create MS Teams link
                </Button>
                <Button variant="outline" className="justify-start">
                    <SlackLogo />
                    Create Slack Huddle
                </Button>
            </div>
        </div>
    )
} 