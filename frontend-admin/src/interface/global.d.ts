
interface ReferralCodeTableData {
  id: string;
  username: string;
  refferalCode: string;
  referalSendRate: number;
  referalReceiveRate: number;
  referalCount: number;
  referalBalance: number;
  createdAt: string;
}

interface VoucherTableData {
  id: string;
  voucherName: string;
  pointValue: number;
  pointPrice: number;
  createdAt: string;
  updatedAt: string;
}

interface EventTableData {
  id: string;
  name: string;
  imageUrl: string;
  shortDescription: string;
  description: string;
  isActive: boolean;
  category: string;
  eventDate: string;
  createdAt: string;
  updatedAt: string;
}

interface ItemMallTableData {
  id: string;
  itemId: number;
  itemImage: string;
  itemName: string;
  itemDescription: string;
  itemQuantity: number;
  streamerPrice: number;
  cashCoinPrice: number;
  stock: number;
  sold: number;
  isPermanent: boolean;
  isOnSale: boolean;
  durationTimeInMinutes: number;
  itemMallCategories: {
    name: string;
    color: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

interface UserByIdResponse extends BaseResponse {
  data: {
    id: string;
    role: string;
    username: string;
    regDate: string;
    userLevel: number;
    charName: string;
    gameserverBurnho: number;
    serverenterTime: string;
    enterIp: string;
    recordLock: number;
    lockTime: number;
    gameBlock: string;
    deleteFlag: number;
    deleteDate: string;
    payFlag: number;
    updateDate: string;
    nickName: string;
    email: string;
    emailConfirmed: boolean;
    emailConfirmedDate: string;
    tSealBlessing: string;
    tCharSlot: number;
    tAttendanceMonth: number;
    tAttendanceYday: number;
    tAttendanceReward: number;
    tRewardTime: number;
    tRewardTimeLast: number;
    point: number;
    eventPoint: number;
    refreshToken: string;
    createdAt: string;
    updatedAt: string;
  }
}


interface ItemMallCategory {id: number, name: string, color: string}