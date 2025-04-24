import { toast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateEvent } from "@/services/Events/Events.query";
import EventForm from "@/components/forms/EventForm";
import { Layout } from "@/components/custom/layout";
import ThemeSwitch from "@/components/theme-switch";
import { UserNav } from "@/components/user-nav";
import { Search } from "@/components/search";
import { useNavigate } from "react-router-dom";

const EventAddPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const eventMutation = useCreateEvent({
    onSuccess: ({message}) => {
      toast({ title: message , style: { backgroundColor: 'green' } });
      queryClient.invalidateQueries({ queryKey: ['events'] })
      navigate('/events')
    },
    onError: ({ response }) => {
      const responseStatus = (response?.data as { message: string }).message;
      toast({ title: responseStatus, style: { backgroundColor: 'red' } });
    },
  });

  const { mutate: createEvent, isPending } = eventMutation;

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
            <h1 className="text-2xl font-bold">Add Event</h1>
            <p>
              Masukkan data untuk membuat Event baru
            </p>
          </div>
          <div className="overflow-y-auto flex-1">
            <EventForm
              onSubmit={(data) => createEvent(data)} // wrap createEventto match SubmitHandler type
              isPending={isPending} // Pass loading state
            />
          </div>
        </Layout.Body>

      </Layout>
    </>
  );
};

export default EventAddPage;
