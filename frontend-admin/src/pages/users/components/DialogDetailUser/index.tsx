import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRecoilState } from "recoil";
import { tableEditorState } from "@/store/table_recoil";
import { useGetUserById } from "@/services/Users/Users.query";

export const DialogDetailUser = () => {
  const [table, setTable] = useRecoilState(tableEditorState);

  const {data: userData, isLoading: loadingUser} = useGetUserById(table?.selectedItem?.id, table.isEditing);

  return (
    <Dialog open={table.isEditing} onOpenChange={() => setTable((prevTable) => ({ ...prevTable, isEditing: false, selectedItem: {id: '', name: ''} }))}>
      <DialogContent>
      <DialogHeader style={{ position: 'sticky', top: 0}}>
        <DialogTitle>Detail User</DialogTitle>
        <DialogDescription>
        Data detail mengenai user
        </DialogDescription>
      </DialogHeader>
      {loadingUser ? (
        <p>Loading...</p>
      ) : (
        <div style={{ maxHeight: '400px', overflowY: 'auto', overflowX: 'hidden', paddingTop: '1rem' }}>
        <div className="space-y-6">
          {/* Account Information Section */}
          <div>
            <h2 className="text-xl font-bold mb-4">Account Information</h2>
            <div className="grid grid-cols-2 gap-y-6">
              <div><h1 style={{ fontWeight: 'bold' }}>ID</h1><p>{userData?.data.id}</p></div>
              <div><h1 style={{ fontWeight: 'bold' }}>Role</h1><p>{userData?.data.role}</p></div>
              <div><h1 style={{ fontWeight: 'bold' }}>Username</h1><p>{userData?.data.username}</p></div>
              <div><h1 style={{ fontWeight: 'bold' }}>Registration Date</h1><p>{userData?.data.regDate ? new Date(userData.data.regDate).toLocaleString() : '-'}</p></div>
              <div><h1 style={{ fontWeight: 'bold' }}>Email</h1><p>{userData?.data.email}</p></div>
              <div><h1 style={{ fontWeight: 'bold' }}>Email Confirmed</h1><p>{userData?.data.emailConfirmed ? "Yes" : "No"}</p></div>
              <div><h1 style={{ fontWeight: 'bold' }}>Email Confirmed Date</h1><p>{userData?.data.emailConfirmedDate ? new Date(userData.data.emailConfirmedDate).toLocaleString() : '-'}</p></div>
              <div><h1 style={{ fontWeight: 'bold' }}>Created At</h1><p>{userData?.data.createdAt ? new Date(userData.data.createdAt).toLocaleString() : '-'}</p></div>
              <div><h1 style={{ fontWeight: 'bold' }}>Updated At</h1><p>{userData?.data.updatedAt ? new Date(userData.data.updatedAt).toLocaleString() : '-'}</p></div>
            </div>
          </div>
          <hr/>
          {/* Game Information Section */}
          <div>
            <h2 className="text-xl font-bold mb-4">Game Information</h2>
            <div className="grid grid-cols-2 gap-y-6">
                <div><h1 style={{ fontWeight: 'bold' }}>Character Name</h1><p>{userData?.data.charName ?? '-'}</p></div>
                <div><h1 style={{ fontWeight: 'bold' }}>Nickname</h1><p>{userData?.data.nickName}</p></div>
                <div><h1 style={{ fontWeight: 'bold' }}>User Level</h1><p>{userData?.data.userLevel}</p></div>
                <div><h1 style={{ fontWeight: 'bold' }}>Point</h1><p>{userData?.data.point}</p></div>
                <div><h1 style={{ fontWeight: 'bold' }}>Event Point</h1><p>{userData?.data.eventPoint}</p></div>
                <div><h1 style={{ fontWeight: 'bold' }}>Game Block</h1><p>{userData?.data.gameBlock}</p></div>
                <div><h1 style={{ fontWeight: 'bold' }}>Gameserver Burnho</h1><p>{userData?.data.gameserverBurnho}</p></div>
                <div><h1 style={{ fontWeight: 'bold' }}>Character Slot</h1><p>{userData?.data.tCharSlot}</p></div>
                <div><h1 style={{ fontWeight: 'bold' }}>Seal Blessing</h1><p>{userData?.data.tSealBlessing}</p></div>
                <div><h1 style={{ fontWeight: 'bold' }}>Record Lock</h1><p>{userData?.data.recordLock}</p></div>
                <div><h1 style={{ fontWeight: 'bold' }}>Lock Time</h1><p>{userData?.data.lockTime ? new Date(userData.data.lockTime).toLocaleString() : '-'}</p></div>
                <div><h1 style={{ fontWeight: 'bold' }}>Server Enter Time</h1><p>{userData?.data.serverenterTime ? new Date(userData.data.serverenterTime).toLocaleString() : '-'}</p></div>
                <div><h1 style={{ fontWeight: 'bold' }}>Enter IP</h1><p>{userData?.data.enterIp}</p></div>
                <div><h1 style={{ fontWeight: 'bold' }}>Pay Flag</h1><p>{userData?.data.payFlag}</p></div>
                <div><h1 style={{ fontWeight: 'bold' }}>Delete Flag</h1><p>{userData?.data.deleteFlag}</p></div>
                <div><h1 style={{ fontWeight: 'bold' }}>Delete Date</h1><p>{userData?.data.deleteDate ? new Date(userData.data.deleteDate).toLocaleString() : '-'}</p></div>
                <div><h1 style={{ fontWeight: 'bold' }}>Update Date</h1><p>{userData?.data.updateDate ? new Date(userData.data.updateDate).toLocaleString() : '-'}</p></div>
                <div><h1 style={{ fontWeight: 'bold' }}>Attendance Month</h1><p>{userData?.data.tAttendanceMonth}</p></div>
                <div><h1 style={{ fontWeight: 'bold' }}>Attendance Yesterday</h1><p>{userData?.data.tAttendanceYday}</p></div>
                <div><h1 style={{ fontWeight: 'bold' }}>Attendance Reward</h1><p>{userData?.data.tAttendanceReward}</p></div>
                <div><h1 style={{ fontWeight: 'bold' }}>Reward Time</h1><p>{userData?.data.tRewardTime ? new Date(userData.data.tRewardTime).toLocaleString() : '-'}</p></div>
                <div><h1 style={{ fontWeight: 'bold' }}>Reward Time Last</h1><p>{userData?.data.tRewardTimeLast ? new Date(userData.data.tRewardTimeLast).toLocaleString() : '-'}</p></div>
            </div>
          </div>
        </div>
        </div>
      )}
      </DialogContent>
    </Dialog>
  );
};
