import { Layout } from '@/components/custom/layout'
import { Separator } from '@/components/ui/separator'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { DialogEditClientUrl } from './components/DialogEditClientUrl'
// import { DialogRemoveClientUrl } from './components/DialogRemoveClientUrl'
import { useGetAllGameClients } from '@/services/ClientUrl/ClientUrl.query'
import ClientUrlCard from './components/ClientUrlCard'
import { DialogAddClientUrl } from './components/DialogAddClientUrl'

export default function ClientUrl() {

  const { data: gameClientsData, isLoading, isError } = useGetAllGameClients();

  return (
    <Layout fixed>
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

      {/* ===== Content ===== */}
      <Layout.Body className='flex flex-col'>
        <div className='flex items-center justify-between mb-5'>
          <div>
            <h1 className='text-2xl font-bold tracking-tight'>
              Game Clients
            </h1>
            <p className='text-muted-foreground'>
              Here&apos;s a list of game clients
            </p>
          </div>
          <DialogAddClientUrl />
        </div>
       
        <Separator className='shadow' />

        <span className='mt-6'>
          {!isLoading && gameClientsData?.data?.length === 0 && (
              <p className='text-muted-foreground'>No Game Client found</p>
          )}
          {isLoading && (
              <p className='text-muted-foreground'>Loading...</p>
          )}
          {isError && (
            <p className='text-muted-foreground'>An error occurred</p>
          )}
        </span>
        <ul className='faded-bottom no-scrollbar grid gap-4 overflow-auto pb-16 pt-4 lg:grid-cols-2 xl:grid-cols-3'>
          {gameClientsData?.data?.map((gameClient) => (
            <ClientUrlCard gameClient={gameClient} key={gameClient.id}/>
          ) )}
        </ul>
        <DialogEditClientUrl clientUrlData={gameClientsData?.data || []}/>
        {/* <DialogRemoveClientUrl /> */}
      </Layout.Body>
    </Layout>
  )
}
