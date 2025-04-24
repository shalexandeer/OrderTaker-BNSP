import { toast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useGetEventById, useUpdateEvent } from "@/services/Events/Events.query";
import EventForm from "@/components/forms/EventForm";
import { Layout } from "@/components/custom/layout";
import ThemeSwitch from "@/components/theme-switch";
import { UserNav } from "@/components/user-nav";
import { Search } from "@/components/search";
import { useNavigate, useParams } from "react-router-dom";
import { IconChevronLeft } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

const EventEditPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const params = useParams();

  const eventId = params?.id ?? '';
  const {data: eventData, isLoading: loadingEvent} = useGetEventById(eventId, eventId !== null && eventId !== undefined && eventId !== "");

  const eventMutation = useUpdateEvent({
    onSuccess: ({message}) => {
      toast({ title: message, style: { backgroundColor: 'green' } });
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
    onError: ({ response }) => {
      const responseStatus = (response?.data as { message: string }).message;
      toast({ title: responseStatus, style: { backgroundColor: 'red' } });
    },
  });

  const { mutate: updateEvent, isPending } = eventMutation;

  return (
    <>
      <Layout fixed className="overflow-y-scroll">
        {/* ===== Top Heading ===== */}
        <Layout.Header>
          <div className='flex w-full items-center justify-between'>
            <Search />
            <div className='flex items-center space-x-4'>
              <ThemeSwitch />
              <UserNav />
            </div>
          </div>
        </Layout.Header>

        <Layout.Body className='flex flex-col overflow-y-scroll'>
          <div className="sticky top-0 bg-background pb-8">
            <Button className="mb-6" onClick={() => navigate('/events')}>
              <IconChevronLeft className="size-6" />
              <h1>Back</h1>
            </Button>
            <h1 className="text-2xl font-bold">Edit Event</h1>
            <p>
              Masukkan untuk edit Event
            </p>
          </div>
          <div className="overflow-y-auto flex-1">
            <EventForm
              onSubmit={(data) => updateEvent(data)}
              isPending={isPending}
              loadingEvent={loadingEvent}
              defaultValues={eventData?.data} // Prefill form with the selected event data
            />
          </div>
        </Layout.Body>

      </Layout>
    </>
  );
};

export default EventEditPage;
