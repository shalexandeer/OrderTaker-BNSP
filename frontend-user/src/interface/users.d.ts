interface User {
  customerName: string;
  customerEmail: string;
  restaurantId: number | string;
  paymentMethod: "cashier" | "online";
  mejaId: string;
  no: number | string;
}

interface UserRoom {
  id: number;
  hotelId: number;
  no: string;
  guestName: string;
  greetings: string;
  sender: string;
  senderPosition: string;
  link: string;
  guestPhoto: string | null;
  macAddr: string;
  wifiSsid: string;
  wifiPassword: string;
  checkInTime: string;
  checkOutTime: string;
  createdAt?: string;
  updatedAt?: string;
}
