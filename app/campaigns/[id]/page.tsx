import { CampaignManagementClient } from "./client";

export default function CampaignManagementPage({ params }: { params: { id: string } }) {
  return <CampaignManagementClient id={params.id} />;
}

// Generate static paths for all possible campaign IDs
export function generateStaticParams() {
  return [
    { id: "new" },
    { id: "1" },
    { id: "2" },
    { id: "3" },
  ];
}