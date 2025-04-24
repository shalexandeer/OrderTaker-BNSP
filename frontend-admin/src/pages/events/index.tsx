import { useEffect, useState } from 'react'
import {
  IconAdjustmentsHorizontal,
  IconSortAscendingLetters,
  IconSortDescendingLetters,
} from '@tabler/icons-react'
import { Layout } from '@/components/custom/layout'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { useGetEventCategories, useGetEvents } from '@/services/Events/Events.query'
import { useNavigate, useSearchParams } from 'react-router-dom'
import EventCard from './components/EventCard'
import { DialogAddCategory } from './components/DialogAddCategory'
import { DialogEditEvent } from './components/DialogEditEvent'
import { DialogRemoveEvent } from './components/DialogRemoveEvent'
import { Button } from '@/components/custom/button'

export default function Apps() {
  const [sort, setSort] = useState('ascending')
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory ] = useState('all');
  const [searchTerm, setSearchTerm] = useState('')

  const [searchParams, setSearchParams] = useSearchParams();

  const params = {
    page: parseInt(searchParams.get('page') || '1', 10),
    pageSize: parseInt(searchParams.get('pageSize') || '10', 10),
    orderBy: searchParams.get('orderBy') || 'createdAt',
    isAscending:  searchParams.get('isAscending') === 'true',
  }

  const { data: eventsData, isLoading, isError } = useGetEvents(params);
  const {data: categoryData, isLoading: loadingCategory} = useGetEventCategories({
    page:1,
    pageSize: 100,
    orderBy: 'name',
    isAscending: true,
  });

  useEffect(() => {
    if (eventsData?.data?.pagination) {
      const {page, pageSize, totalPage, totalData } = eventsData.data.pagination;
      setSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
        totalPage: totalPage.toString(),
        totalData: totalData.toString(),
        orderBy: searchParams.get('orderBy') || 'createdAt',
        isAscending: (searchParams.get('isAscending') === 'true').toString()
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventsData]);

  const handleSortChange = (value: string) => {
    setSort(value);
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      isAscending: (value === 'ascending').toString(),
    });
  };

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
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-2xl font-bold tracking-tight'>
              Events
            </h1>
            <p className='text-muted-foreground'>
              Here&apos;s a list of events
            </p>
          </div>
          <Button onClick={() => navigate('/events/add')}>Add Event</Button>
        </div>
        <div className='my-4 flex items-end justify-between sm:my-0 sm:items-center'>
          <div className='flex flex-col gap-4 sm:my-4 sm:flex-row'>
            <Input
              placeholder='Search events by name...'
              className='h-9 w-full lg:w-[250px]'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className='w-full lg:w-36'>
              <SelectValue>{loadingCategory ? 'Loading....' : selectedCategory}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>all</SelectItem>
                {categoryData?.data?.data?.map((category) => (
                  <SelectItem key={category.name} value={category.name}>{category.name}</SelectItem>
                ))}
              </SelectContent>
              <DialogAddCategory />
            </Select>
          </div>

          <Select value={sort} onValueChange={handleSortChange}>
            <SelectTrigger className='w-16'>
              <SelectValue>
                <IconAdjustmentsHorizontal size={18} />
              </SelectValue>
            </SelectTrigger>
            <SelectContent align='end'>
              <SelectItem value='ascending'>
                <div className='flex items-center gap-4'>
                  <IconSortAscendingLetters size={16} />
                  <span>Ascending</span>
                </div>
              </SelectItem>
              <SelectItem value='descending'>
                <div className='flex items-center gap-4'>
                  <IconSortDescendingLetters size={16} />
                  <span>Descending</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Separator className='shadow' />

        <span className='mt-6'>
          {!isLoading && eventsData?.data?.data?.length === 0 && (
              <p className='text-muted-foreground'>No events found</p>
          )}
          {isLoading && (
              <p className='text-muted-foreground'>Loading...</p>
          )}
          {isError && (
            <p className='text-muted-foreground'>An error occurred</p>
          )}
        </span>
        <ul className='faded-bottom no-scrollbar grid gap-4 overflow-auto pb-16 pt-4 lg:grid-cols-2 xl:grid-cols-3'>
          {eventsData?.data?.data?.map((event) => (
            <EventCard event={event} key={event.id}/>
          ) )}
        </ul>
        <DialogEditEvent />
        <DialogRemoveEvent/>
      </Layout.Body>
    </Layout>
  )
}
