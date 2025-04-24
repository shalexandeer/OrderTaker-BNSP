import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/services/url";
import { tableEditorState } from "@/store/table_recoil";
import { IconPencil } from "@tabler/icons-react";
import { useRecoilState } from "recoil";

interface ClientUrlCardProps {
  gameClient: ClientUrlBody;
}

const ClientUrlCard = ({  gameClient}: ClientUrlCardProps) => {
  const [, setActions] = useRecoilState(tableEditorState);
  // const handleDelete = () => {
  //   setActions((prevActions) => ({
  //     ...prevActions,
  //     isDeleting: true,
  //     selectedItem: {
  //       id: gameClient.uuid || "",
  //       name: gameClient.title,
  //     }
  //   }));
  // };

  const handleEdit = () => {
    setActions((prevActions) => ({
      ...prevActions,
      isEditing: true,
      selectedItem: {
        id: gameClient.id || "",
        name: gameClient.title,
      }
    }));
  };




  return (
    <li
    key={gameClient.uuid}
      className='rounded-lg border p-4 hover:shadow-md flex space-x-4 justify-between '
    >
      <div className="flex gap-4">
        <div className='flex items-center justify-between'>
        <div
          style={{
            backgroundImage: `url(${BASE_URL}/${gameClient.imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
            className={`flex size-36 items-center justify-center rounded-lg bg-muted p-2 relative`}
          >
            <span className="flex gap-2 absolute bottom-2 w-full px-2 justify-between">
              <Button size={'sm'} onClick={handleEdit}><IconPencil/></Button>
              {/* <Button variant={'destructive'} size={'sm'} onClick={handleDelete}><IconTrash/></Button> */}
            </span>
          </div>
        </div>
        <div>
          <h2 className='mb-1 font-semibold'>{gameClient.title}</h2>
          <p className='line-clamp-2 text-gray-500'>{gameClient.url}</p>
        </div>
      </div>
    </li>
  )
}

export default ClientUrlCard;