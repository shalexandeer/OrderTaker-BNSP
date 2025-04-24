interface BaseResponse {
  success: boolean
  message: string
}

interface TPagination {
  page: number
  pageSize: number
  totalPage: number
  totalData: number
  orderBy?: string
  isAscending?: boolean
  q: string
}

interface AuthData {
  accessToken: string
  refreshToken: string
} 

interface AuthResponse extends BaseResponse {
  data: AuthData
}

interface UpdateProfileResponse extends BaseResponse {
  data: {
    email: string
    oldPassword: string
    newPassword: string
  }
}


interface ReferralCodeResponse extends BaseResponse {
  data: ReferralCodeBody
}

interface UserDropdownInfoResponse extends BaseResponse {
  data: {
    id: string
    username: string
  }[]
}

interface VoucherWithIdBody extends VoucherResponse {
  id: string
}

interface VoucherResponse extends BaseResponse {
  data: {
    pagination: TPagination
    data: VoucherTableData[]
  }
}

interface VoucherUpdateBody extends VoucherBody {
  id: string
}


interface ReferralsResponse extends BaseResponse {
  data: {
    pagination: TPagination
    data: ReferralCodeTableData[]
  }
}

interface ReferralsResponseById extends BaseResponse {
  data: ReferralCodeTableData
}


interface UsersResponse extends BaseResponse {
  data: {
    pagination: TPagination
    data: UserTableData[]
  }
}


interface ItemMallResponse extends BaseResponse {
  data: {
    pagination: TPagination
    data: ItemMallTableData[]
  }
}

interface ItemMallCategoryResponse extends BaseResponse {
  data: {id: number, name: string, color: string}[]
}

interface EventResponse extends BaseResponse {
  data: {
    pagination: TPagination
    data: EventTableData[]
  }
}
interface EventCategoryResponse extends BaseResponse {
  data: {
    pagination: TPagination
    data: {
      id: string;
      name: string;
      createdAt: string,
      updatedAt: string
    }[]
  }
}

interface EventResponseById extends BaseResponse {
  data: EventTableData
}

interface BlockedUsernameResponse extends BaseResponse {
  data: {
    pagination: TPagination
    data: {
      id: number;
      username: string;
      blockedAt: string;
    }[]
  }
}

interface ClientUrlResponse extends BaseResponse {
  data: ClientUrlBody[]
}