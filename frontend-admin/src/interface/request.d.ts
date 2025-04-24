interface ParamsBody {
  page: number
  pageSize: number
  orderBy?: string
  isAscending?: boolean
  querySearch?: string
}

interface RegisterBody {
  email: string
  username: string
  nickName: string
  pin: string
  password: string
}

interface LoginBody {
  username: string
  password: string
}

interface UpdateProfileBody {
  email?: string
  oldPassword?: string
  newPassword?: string
}

interface PaymentDonationBody {
  voucherId: string
  reffCode: string
}

interface ReferralCodeBody {
  id: string
  username?: string
  referralCode: string
  referralSendRate: number
  referralReceiveRate: number
}

interface ItemMallBody {
  itemId: number
  itemName: string
  itemImage: string
  itemDescription: string
  itemQuantity: number
  streamerPrice: number
  cashCoinPrice: number
  stock: number
  sold: number
  isPermanent: boolean
  isOnSale: boolean
  durationTimeInMinutes: number
  itemMallCategories: {
    id: number
  }[]
}

interface VoucherBody {
  voucherName: string
  pointValue: number
  pointPrice: number
}

interface EventBody{
  name: string
  image: string
  description: string
  shortDescription: string
  categoryId: string
  eventDate: string
  isActive: boolean
  imageUrl?: string
  category?: string
  id?: string
}

interface ClientUrlBody {
  uuid?: string
  id?: string
  imageUrl?: string
  image: string
  title: string
  url: string
}
