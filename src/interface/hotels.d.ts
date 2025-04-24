

interface Hotel {
  id: number,
  name: string,
  branch: string,
  city: string,
  province: string,
  state: string,
  apiKey: string,
  createdAt?: Date | string,
  updatedAt?: Date | string,
  deletedAt?: Date | string,
}

interface Question {
  id: number;
  question: string;
};


interface Order {
  id: number,
  name: string,
  price: number,
  img: string,
  status: 'pending' | 'sent'
  from: 'facilities' | 'foods' | 'restaurants' | 'events' | 'amenities',
  quantity: number,
  notes: notes[]
}

interface notes {
  quantity: number,
  note?: string
  additional?: Additional[]
}

interface Additional {
  id: number, name: string, price: number
}

interface Calls {
  id: number,
  name: string,
  image: string,
  phoneNumber: string,
  createdAt?: Date | string,
  updatedAt?: Date | string,
  deletedAt?: Date | string,
}

interface Orders {
  hotelId: number,
  roomId: number,
  foodItems: {
    foodId: number,
    name: string,
    price: number,
    qty: number,
    note: string,
    foodAdditional: [
      {
        name: string,
        price: number
      }
    ]
  },
  amenityItems: [
    {
      amenityId: number,
      name: string,
      price: number,
      qty: number,
      note: string,
    }
  ],
  facilitiyItems: [
    {
      facilityId: number,
      name: string,
      price: number,
      qty: number,
      note: string,
    }
  ],
  eventItems: [
    {
      eventId: number,
      name: string,
      price: number,
      qty: number,
    }
  ]
}


interface FeedbackQuestion {
  id: number,
  question: string,
  hotelId: number,
  createdAt?: Date | string,
  updatedAt?: Date | string,
  deletedAt?: Date | string,
}

interface FeedbackAnswer {
  questionId: number,
  roomId: number,
  answer: number,
  hotelId: number,
  createdAt?: Date | string,
  updatedAt?: Date | string,
  deletedAt?: Date | string,
}


interface Department {
  id: number,
  hotelId: number,
  department: string,
  icon: string,
}