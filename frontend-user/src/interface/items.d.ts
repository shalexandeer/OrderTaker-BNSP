
interface Foods {
  id: number;
  name: string;
  categoryId: number;
  foodCategory: FoodsCategory;
  description: string;
  price: number;
  favorite: number;
  availability: boolean;
  stock: number;
  img: string;
  createdAt?: Date | string,
  updatedAt?: Date | string,
  deletedAt?: Date | string,
};

interface FoodsCategory {
  id: number;
  hotelId: number;
  name: string;
  img: string;
  createdAt?: Date | string,
  updatedAt?: Date | string,
  deletedAt?: Date | string,
};

interface Amenities {
  id: number;
  name: string;
  categoryId: number;
  price: number;
  description: string;
  img: string;
  availability: boolean;
  stock: number;
  category: AmenitiesCategory;
  createdAt?: Date | string,
  updatedAt?: Date | string,
  deletedAt?: Date | string,
};

interface AmenitiesCategory {
  id: number;
  hotelId: number;
  name: string;
  img: string;
  createdAt?: Date | string,
  updatedAt?: Date | string,
  deletedAt?: Date | string,
};

interface MakeUpRoom {
  id: number;
  categoryId: number;
  hotelId: number;
  name: string;
  description: string;
  img: string;
  price: number;
  availability: boolean;
  stock: number;
  createdAt?: Date | string,
  updatedAt?: Date | string,
  deletedAt?: Date | string,
}


interface Facilities {
  id: number;
  categoryId: number;
  name: string;
  img: string;
  description: string;
  price: number;
  category: FacilitiesCategory;
  createdAt?: Date | string,
  updatedAt?: Date | string,
  deletedAt?: Date | string,
};

interface RoomData {
  id: number;
  hotelId: number;
  roomId: number;
  no: string;
  guestName: string;
  greetings: string;
  sender: string;
  senderPosition: string;
  guestPhoto: string;
  macAddr: string;
  wifiSsid: string;
  wifiPassword: string;
  checkInTime: Date | string;
  checkOutTime: Date | string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

interface FacilitiesCategory {
  id: number;
  hotelId: number;
  name: string;
  img: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string;
};

interface Events {
  id: number;
  categoryId: number;
  name: string;
  img: string;
  description: string;
  price: number;
  category: EventsCategory;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string;
};

interface EventsCategory {
  id: number;
  hotelId: number;
  name: string;
  img: string;
  createdAt?: Date | string,
  updatedAt?: Date | string,
  deletedAt?: Date | string,
};


interface HotelProfile {
  id: number;
  hotelId: number;
  logoColor: string;
  logoWhite: string;
  logoBlack: string;
  primaryColor: string;
  description: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

interface HotelData {
  id: number;
  name: string;
  branch: string;
  city: string;
  province: string;
  state: string;
  defaultGreeting: string;
  defaultLink: string;
  groupId: number;
  apiKey: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}