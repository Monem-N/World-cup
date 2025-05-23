import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Checkbox } from "~/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Card, CardContent } from "~/components/ui/card";

import { activityFormSchema, type ActivityFormValues } from "~/lib/validations/activity-schema";
import type { Activity } from "~/lib/types";

interface ActivityFormProps {
  defaultValues?: Partial<ActivityFormValues>;
  onSubmit: (data: ActivityFormValues) => void;
  isSubmitting?: boolean;
  itineraryDate: string;
}

export function ActivityForm({
  defaultValues,
  onSubmit,
  isSubmitting = false,
  itineraryDate,
}: ActivityFormProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = React.useState("basic");

  const form = useForm({
    // @ts-ignore - Ignoring type issues with the resolver
    resolver: zodResolver(activityFormSchema),
    defaultValues: {
      type: "activity",
      title: "",
      time: "",
      duration: "",
      status: "pending",
      important: false,
      requiresConfirmation: false,
      isGroupEvent: false,
      notes: "",
      ...defaultValues,
    },
  });

  // @ts-ignore - Ignoring type issues with the form submission
  const handleSubmit = (data) => {
    onSubmit(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="location">Location</TabsTrigger>
            <TabsTrigger value="transport">Transport</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('forms.activityType', 'Activity Type')}</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={t('forms.selectActivityType', 'Select activity type')} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="activity">{t('activityTypes.activity', 'Activity')}</SelectItem>
                              <SelectItem value="transport">{t('activityTypes.transport', 'Transport')}</SelectItem>
                              <SelectItem value="match">{t('activityTypes.match', 'Match')}</SelectItem>
                              <SelectItem value="meal">{t('activityTypes.meal', 'Meal')}</SelectItem>
                              <SelectItem value="hotel">{t('activityTypes.hotel', 'Hotel')}</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('forms.status', 'Status')}</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={t('forms.selectStatus', 'Select status')} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="pending">{t('statusOptions.pending', 'Pending')}</SelectItem>
                              <SelectItem value="confirmed">{t('statusOptions.confirmed', 'Confirmed')}</SelectItem>
                              <SelectItem value="completed">{t('statusOptions.completed', 'Completed')}</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('forms.title', 'Title')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('forms.activityTitle', 'Activity title')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="time"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('forms.time', 'Time')}</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormDescription>
                            {t('forms.timeFormat', 'Time in 24-hour format (HH:MM)')}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="duration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('forms.duration', 'Duration')}</FormLabel>
                          <FormControl>
                            <Input placeholder={t('forms.durationPlaceholder', 'e.g. 1h30m')} {...field} />
                          </FormControl>
                          <FormDescription>
                            {t('forms.durationFormat', 'Duration format: 1h30m, 45m, etc.')}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('forms.notes', 'Notes')}</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={t('forms.notesPlaceholder', 'Additional notes about this activity')}
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 gap-2">
                    <FormField
                      control={form.control}
                      name="important"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>{t('forms.markImportant', 'Mark as important')}</FormLabel>
                            <FormDescription>
                              {t('forms.importantDescription', 'Highlight this activity as important')}
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="requiresConfirmation"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>{t('forms.requiresConfirmation', 'Requires confirmation')}</FormLabel>
                            <FormDescription>
                              {t('forms.confirmationDescription', 'This activity needs to be confirmed')}
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="isGroupEvent"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>{t('forms.groupEvent', 'Group event')}</FormLabel>
                            <FormDescription>
                              {t('forms.groupDescription', 'This is a group activity')}
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="location" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="location.name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('forms.locationName', 'Location Name')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('forms.locationName', 'Location name')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location.address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('forms.address', 'Address')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('forms.address', 'Full address')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="location.lat"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('forms.latitude', 'Latitude')}</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.000001"
                              placeholder={t('forms.latitude', 'Latitude')}
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="location.lng"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('forms.longitude', 'Longitude')}</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.000001"
                              placeholder={t('forms.longitude', 'Longitude')}
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transport" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="transport.mode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('forms.transportMode', 'Transport Mode')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('forms.transportMode', 'e.g. Flight, Train, Bus')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="transport.carrier"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('forms.carrier', 'Carrier')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('forms.carrier', 'e.g. Delta Airlines')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="transport.bookingReference"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('forms.bookingReference', 'Booking Reference')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('forms.bookingReference', 'e.g. ABC123')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            {t('common.reset', 'Reset')}
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? t('common.saving', 'Saving...') : t('common.save', 'Save Activity')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
