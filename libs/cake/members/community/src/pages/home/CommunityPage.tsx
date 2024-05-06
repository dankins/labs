import { ConnectionRequests } from "../../components/ConnectionRequests";
import { RecommendedConnections } from "../../components/RecommendedConnections";
import { Connections } from "../../components/Connections";

export async function CommunityPage() {
  return (
    <div className="flex flex-col gap-6">
      <ConnectionRequests />
      <Connections />
      <RecommendedConnections />
    </div>
  );
}
