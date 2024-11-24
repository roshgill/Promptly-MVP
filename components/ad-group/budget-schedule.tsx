"use client";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AdGroup, Duration } from "@/types/ad-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface BudgetScheduleProps {
  adGroup: AdGroup;
  onChange: (adGroup: AdGroup) => void;
}

export function BudgetSchedule({ adGroup, onChange }: BudgetScheduleProps) {
  const toggleDurationType = (type: Duration) => {
    onChange({
      ...adGroup,
      schedule: {
        ...adGroup.schedule,
        durationType: type,
        startDate: type === "fixed" ? new Date() : undefined,
        endDate: type === "fixed" ? undefined : undefined,
      },
    });
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-6">Budget & Schedule</h3>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <Label>Daily Budget</Label>
            <div className="relative">
              <span className="absolute left-3 top-2.5">$</span>
              <Input
                type="number"
                min="0"
                className="pl-6"
                value={adGroup.budget.daily}
                onChange={(e) =>
                  onChange({
                    ...adGroup,
                    budget: { ...adGroup.budget, daily: Number(e.target.value) },
                  })
                }
              />
            </div>
          </div>

          <div className="space-y-4">
            <Label>Total Budget</Label>
            <div className="relative">
              <span className="absolute left-3 top-2.5">$</span>
              <Input
                type="number"
                min="0"
                className="pl-6"
                value={adGroup.budget.total}
                onChange={(e) =>
                  onChange({
                    ...adGroup,
                    budget: { ...adGroup.budget, total: Number(e.target.value) },
                  })
                }
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Label>Duration</Label>
          <div className="flex gap-2">
            <Button
              variant={adGroup.schedule.durationType === "continuous" ? "default" : "outline"}
              onClick={() => toggleDurationType("continuous")}
            >
              Continuous
            </Button>
            <Button
              variant={adGroup.schedule.durationType === "fixed" ? "default" : "outline"}
              onClick={() => toggleDurationType("fixed")}
            >
              Fixed Period
            </Button>
          </div>
        </div>

        {adGroup.schedule.durationType === "fixed" && (
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !adGroup.schedule.startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {adGroup.schedule.startDate ? (
                      format(adGroup.schedule.startDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={adGroup.schedule.startDate}
                    onSelect={(date) =>
                      onChange({
                        ...adGroup,
                        schedule: { ...adGroup.schedule, startDate: date || undefined },
                      })
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-4">
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !adGroup.schedule.endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {adGroup.schedule.endDate ? (
                      format(adGroup.schedule.endDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={adGroup.schedule.endDate}
                    onSelect={(date) =>
                      onChange({
                        ...adGroup,
                        schedule: { ...adGroup.schedule, endDate: date || undefined },
                      })
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}