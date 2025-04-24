import { Table } from '@tanstack/react-table'
// import { Input } from '@/components/ui/input'
import { DataTableViewOptions } from '../components/data-table-view-options'
// import { useNavigate } from 'react-router-dom'
// import { useState, useEffect } from 'react'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  // const navigate = useNavigate()
  
  // const [searchValue, setSearchValue] = useState(
  //   new URLSearchParams(window.location.search).get('q') ?? ''
  // )

  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchValue(event.target.value)
  // }

  // useEffect(() => {
  //   const handler = setTimeout(() => {
  //     const searchParams = new URLSearchParams(window.location.search)
  //     if (searchValue) {
  //       searchParams.set('q', searchValue)
  //     } else {
  //       searchParams.delete('q')
  //     }
  //     navigate(`?${searchParams.toString()}`)
  //   }, 300) // Debounce delay in milliseconds

  //   return () => {
  //     clearTimeout(handler)
  //   }
  // }, [searchValue, navigate])

  return (
    <div className='flex items-center justify-between'>
      {/* <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        <Input
          placeholder='Search by name...'
          value={searchValue}
          onChange={handleInputChange}
          className='h-8 w-[150px] lg:w-[250px]'
        />
      </div> */}
      <DataTableViewOptions table={table} />
    </div>
  )
}
