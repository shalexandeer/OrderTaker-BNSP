import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/services/url";
import { tableEditorState } from "@/store/table_recoil";
import { IconCalendar, IconPencil, IconTrash } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

interface EventCardProps {
  event: EventTableData;
}

const EventCard = ({  event}: EventCardProps) => {
  const navigate = useNavigate();

  const [, setActions] = useRecoilState(tableEditorState);
  const handleDelete = () => {
    setActions((prevActions) => ({
      ...prevActions,
      isDeleting: true,
      selectedItem: {
        id: event.id,
        name: event.name,
      }
    }));
  };

  const handleEdit = () => {
    navigate(`/events/edit/${event.id}`)
  };

  return (
    <li
    key={event.id}
      className='rounded-lg border p-4 hover:shadow-md flex space-x-4 justify-between '
    >
      <div className="flex gap-4">
        <div className='flex items-center justify-between'>
        <div
          style={{
            backgroundImage: `url(${BASE_URL}/${event.imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
            className={`flex size-36 items-center justify-center rounded-lg bg-muted p-2 relative`}
          >
            <span className="flex gap-2 absolute bottom-2 w-full px-2 justify-between">
              <Button size={'sm'} onClick={handleEdit}><IconPencil/></Button>
              <Button variant={'destructive'} size={'sm'} onClick={handleDelete}><IconTrash/></Button>
            </span>
          </div>
        </div>
        <div>
          <h2 className='mb-1 font-semibold'>{event.name}</h2>
          <p className='line-clamp-2 text-gray-500'>{event.shortDescription}</p>
          <p className="flex items-center"><IconCalendar className="size-4"/> <span>{new Date(event.eventDate).toLocaleDateString()}</span></p>
        </div>
      </div>
      <Button
        variant='outline'
        size='sm'
        className={`${event.isActive && 'border-blue-300 bg-blue-50 hover:bg-blue-100 dark:border-blue-700 dark:bg-blue-950 dark:hover:bg-blue-900'} border `}
      >
        Publish{event.isActive ? 'ed' : ''}
      </Button>
    </li>
  )
}

export default EventCard;