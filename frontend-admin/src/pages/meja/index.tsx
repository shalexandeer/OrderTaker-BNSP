import { Layout } from "@/components/custom/layout";
// import { Search } from '@/components/search';
import ThemeSwitch from "@/components/theme-switch";
import { UserNav } from "@/components/user-nav";
import { useGetReferrals } from "@/services/Referral/Referral.query";
import { useSearchParams } from "react-router-dom"; // Import the useSearchParams hook
import { useEffect } from "react";

export default function Meja() {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = {
    page: parseInt(searchParams.get("page") || "1", 10),
    pageSize: parseInt(searchParams.get("pageSize") || "10", 10),
    orderBy: searchParams.get("orderBy") || "username",
    isAscending: searchParams.get("isAscending") === "true",
  };

  const { data: referralsData, isLoading, isError } = useGetReferrals(params);

  useEffect(() => {
    if (referralsData?.data?.pagination) {
      const { page, pageSize, totalPage, totalData } =
        referralsData.data.pagination;
      setSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
        totalPage: totalPage.toString(),
        totalData: totalData.toString(),
        orderBy: searchParams.get("orderBy") || "createdAt",
        isAscending: (searchParams.get("isAscending") === "true").toString(),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [referralsData]);

  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <Layout.Header sticky>
        {/* <Search /> */}
        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body>
        <div className="mb-2 flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Referral Code</h2>
            <p className="text-muted-foreground">
              You can add, edit, or remove referral codes here
            </p>
          </div>

          {/* <DialogAddReferral />
          <DialogEditReferral />
          <DialogRemoveReferral /> */}
        </div>
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
          {/* <DataTable
            data={referralsData?.data?.data ?? []}
            columns={columns as ColumnDef<ReferralCodeTableData, unknown>[]}
          /> */}
          {isLoading && <div>Loading...</div>}
          {isError && <div>Error fetching data</div>}
        </div>
      </Layout.Body>
    </Layout>
  );
}
