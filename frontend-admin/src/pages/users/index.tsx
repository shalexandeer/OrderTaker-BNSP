import { Layout } from '@/components/custom/layout';
// import { Search } from '@/components/search';
import ThemeSwitch from '@/components/theme-switch';
import { UserNav } from '@/components/user-nav';
import { DataTable } from './components/data-table';
import { columns } from './components/columns';
import { useSearchParams } from 'react-router-dom'; // Import the useSearchParams hook
import { useEffect } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { useGetAllUsers, useSearchUser } from '@/services/Users/Users.query';
import { DialogDetailUser } from './components/DialogDetailUser';
import { DialogRemoveUser } from './components/DialogRemoveUser';

export default function Users() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('q') || '';

  const params = {
    page: parseInt(searchParams.get('page') || '1', 10),
    pageSize: parseInt(searchParams.get('pageSize') || '10', 10),
    orderBy: searchParams.get('orderBy') || 'username',
    isAscending:  searchParams.get('isAscending') === 'true',
  }

  const { data: usersData, isLoading, isError } = useGetAllUsers(params);

  const { data: searchData, isLoading: loadingSearch, isError: errorSearch } = useSearchUser({
    ...params,
    querySearch: query,
  });

  useEffect(() => {
    if (usersData?.data?.pagination) {
      const {page, pageSize, totalPage, totalData } = usersData.data.pagination;
      setSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
        totalPage: totalPage.toString(),
        totalData: totalData.toString(),
        orderBy: searchParams.get('orderBy') || 'username',
        isAscending: (searchParams.get('isAscending') === 'true').toString()
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usersData]);

  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <Layout.Header sticky>
        {/* <Search /> */}
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Users</h2>
            <p className='text-muted-foreground'>
              You can add, edit, or remove users  here
            </p>
          </div>

          {/* <DialogEditUser /> */}
          <DialogRemoveUser />
          <DialogDetailUser />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
         <DataTable
            data={query?.length > 3 ? (searchData?.data?.data ?? []) : (usersData?.data?.data ?? [])}
            columns={columns as ColumnDef<UserTableData, unknown>[]}
          />
          {isLoading || loadingSearch && <div>Loading...</div>}
          {isError || errorSearch && <div>Error fetching data</div>}
        </div>
      </Layout.Body>
    </Layout>
  );
}
