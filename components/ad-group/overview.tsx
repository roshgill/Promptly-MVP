import { AdGroup } from "@/types/ad-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OverviewProps {
  adGroup: AdGroup;
}

export function Overview({ adGroup }: OverviewProps) {
  return (
    <div className="grid gap-4">
      {/* Other cards... */}
      
      <Card>
        <CardHeader>
          <CardTitle>Semantic Targeting</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Context Themes</h4>
              <div className="flex flex-wrap gap-2">
                {adGroup.semanticTargeting.context.themes.map((theme) => (
                  <span 
                    key={theme.value} 
                    className="px-2 py-1 bg-secondary rounded-md text-sm"
                  >
                    {theme.value}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Exclusions</h4>
              <div className="flex flex-wrap gap-2">
                {adGroup.semanticTargeting.context.exclusions.map((exclusion) => (
                  <span 
                    key={exclusion.value}
                    className="px-2 py-1 bg-destructive/10 text-destructive rounded-md text-sm"
                  >
                    {exclusion.value}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Intent</h4>
              <div className="flex flex-wrap gap-2">
                {adGroup.semanticTargeting.intent.map((intent) => (
                  <span 
                    key={intent.value} 
                    className="px-2 py-1 bg-secondary rounded-md text-sm"
                  >
                    {intent.value}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Other targeting and settings cards... */}
    </div>
  );
} 