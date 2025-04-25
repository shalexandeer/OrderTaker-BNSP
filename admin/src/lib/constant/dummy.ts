// =======================================================
// DUMMY DATA FOR REACT QUERY
// =======================================================
  // -------------------------------------------------------
  // Waste Categories

import { Customer } from "@/lib/types/entities/customer";
import { Record, RecordItem } from "@/lib/types/entities/record";
import { Transaction, TransactionItem } from "@/lib/types/entities/transaction";
import { Partner, Waste, WasteCategory, WastePartner } from "@/lib/types/entities/waste";

  // -------------------------------------------------------
  export const dummyWasteCategories: WasteCategory[] = [
    { id: 1, name: 'Organik', order: 1, status: 'active' },
    { id: 2, name: 'Anorganik', order: 2, status: 'active' },
    { id: 3, name: 'B3', order: 3, status: 'active' },
    { id: 4, name: 'Residu', order: 4, status: 'active' },
  ];
  
  // -------------------------------------------------------
  // Wastes
  // -------------------------------------------------------
  export const dummyWastes: Waste[] = [
    { 
      id: 1, 
      categoryId: 1, 
      name: 'Sisa Makanan', 
      slug: 'sisa-makanan', 
      isAccepted: true, 
      status: 'active', 
      description: 'Sisa makanan yang dapat dikompos' 
    },
    { 
      id: 2, 
      categoryId: 2, 
      name: 'Kertas', 
      slug: 'kertas', 
      isAccepted: true, 
      status: 'active', 
      description: 'Kertas bekas, koran, majalah' 
    },
    { 
      id: 3, 
      categoryId: 2, 
      name: 'Botol Plastik', 
      slug: 'botol-plastik', 
      isAccepted: true, 
      status: 'active', 
      description: 'Botol plastik PET' 
    },
    { 
      id: 4, 
      categoryId: 2, 
      name: 'Kardus', 
      slug: 'kardus', 
      isAccepted: true, 
      status: 'active', 
      description: 'Karton dan kardus bersih' 
    },
    { 
      id: 5, 
      categoryId: 3, 
      name: 'Baterai Bekas', 
      slug: 'baterai-bekas', 
      isAccepted: true, 
      status: 'active', 
      description: 'Baterai alkaline dan baterai litium bekas' 
    },
    { 
      id: 6, 
      categoryId: 3, 
      name: 'Lampu Neon', 
      slug: 'lampu-neon', 
      isAccepted: true, 
      status: 'active', 
      description: 'Lampu neon dan lampu hemat energi' 
    },
    { 
      id: 7, 
      categoryId: 4, 
      name: 'Pembalut', 
      slug: 'pembalut', 
      isAccepted: false, 
      status: 'rejected', 
      description: 'Pembalut bekas' 
    },
    { 
      id: 8, 
      categoryId: 4, 
      name: 'Popok', 
      slug: 'popok', 
      isAccepted: false, 
      status: 'rejected', 
      description: 'Popok bekas' 
    },
    { 
      id: 9, 
      categoryId: 2, 
      name: 'Kaleng Aluminium', 
      slug: 'kaleng-aluminium', 
      isAccepted: true, 
      status: 'active', 
      description: 'Kaleng minuman aluminium' 
    },
    { 
      id: 10, 
      categoryId: 2, 
      name: 'Botol Kaca', 
      slug: 'botol-kaca', 
      isAccepted: true, 
      status: 'active', 
      description: 'Botol kaca bening dan berwarna' 
    },
  ];
  
  // -------------------------------------------------------
  // Partners
  // -------------------------------------------------------
  export const dummyPartners: Partner[] = [
    {
      id: 1,
      slug: 'tps-warga-sejahtera',
      display_name: 'TPS Warga Sejahtera',
      location: 'Jl. Merdeka No. 123, Jakarta Selatan',
      type: 'tps',
      capacity: '500kg/hari',
      description: 'TPS untuk pengelolaan sampah warga sekitar'
    },
    {
      id: 2,
      slug: 'tps-bersih-barokah',
      display_name: 'TPS Bersih Barokah',
      location: 'Jl. Kebersihan No. 45, Jakarta Timur',
      type: 'tps',
      capacity: '800kg/hari',
      description: 'TPS dengan fasilitas pengolahan sampah organik'
    },
    {
      id: 3,
      slug: 'sdn-budi-luhur',
      display_name: 'SDN Budi Luhur',
      location: 'Jl. Pendidikan No. 67, Jakarta Pusat',
      type: 'school',
      capacity: '200kg/hari',
      description: 'Sekolah yang menerapkan program bank sampah'
    },
    {
      id: 4,
      slug: 'pt-daur-ulang-sejati',
      display_name: 'PT Daur Ulang Sejati',
      location: 'Jl. Industri No. 89, Jakarta Utara',
      type: 'company',
      capacity: '2000kg/hari',
      description: 'Perusahaan pengolahan sampah terpadu'
    },
    {
      id: 5,
      slug: 'bank-sampah-kampung-hijau',
      display_name: 'Bank Sampah Kampung Hijau',
      location: 'Jl. Lingkungan No. 12, Jakarta Barat',
      type: 'community',
      capacity: '300kg/hari',
      description: 'Bank sampah berbasis komunitas'
    }
  ];
  
  // -------------------------------------------------------
  // Waste Partners
  // -------------------------------------------------------
  export const dummyWastePartners: WastePartner[] = [
    {
      id: 1,
      waste_id: 1,
      partner_id: 1,
      price: 1000,
      additional_attribute: { min_weight: 1, max_weight: 100 }
    },
    {
      id: 2,
      waste_id: 2,
      partner_id: 1,
      price: 2500,
      additional_attribute: { min_weight: 1, max_weight: 50 }
    },
    {
      id: 3,
      waste_id: 3,
      partner_id: 1,
      price: 3000,
      additional_attribute: { min_weight: 1, max_weight: 30 }
    },
    {
      id: 4,
      waste_id: 4,
      partner_id: 1,
      price: 2000,
      additional_attribute: { min_weight: 1, max_weight: 50 }
    },
    {
      id: 5,
      waste_id: 3,
      partner_id: 2,
      price: 3500,
      additional_attribute: { min_weight: 1, max_weight: 40 }
    },
    {
      id: 6,
      waste_id: 4,
      partner_id: 2,
      price: 2200,
      additional_attribute: { min_weight: 1, max_weight: 60 }
    },
    {
      id: 7,
      waste_id: 9,
      partner_id: 2,
      price: 5000,
      additional_attribute: { min_weight: 1, max_weight: 20 }
    },
    {
      id: 8,
      waste_id: 2,
      partner_id: 3,
      price: 2300,
      additional_attribute: { min_weight: 1, max_weight: 30 }
    },
    {
      id: 9,
      waste_id: 3,
      partner_id: 3,
      price: 2800,
      additional_attribute: { min_weight: 1, max_weight: 25 }
    },
    {
      id: 10,
      waste_id: 4,
      partner_id: 4,
      price: 2500,
      additional_attribute: { min_weight: 10, max_weight: 1000 }
    },
    {
      id: 11,
      waste_id: 9,
      partner_id: 4,
      price: 5500,
      additional_attribute: { min_weight: 5, max_weight: 500 }
    },
    {
      id: 12,
      waste_id: 10,
      partner_id: 4,
      price: 1800,
      additional_attribute: { min_weight: 5, max_weight: 800 }
    },
    {
      id: 13,
      waste_id: 2,
      partner_id: 5,
      price: 2400,
      additional_attribute: { min_weight: 1, max_weight: 40 }
    },
    {
      id: 14,
      waste_id: 3,
      partner_id: 5,
      price: 3200,
      additional_attribute: { min_weight: 1, max_weight: 35 }
    },
    {
      id: 15,
      waste_id: 4,
      partner_id: 5,
      price: 2100,
      additional_attribute: { min_weight: 1, max_weight: 45 }
    }
  ];
  
  // -------------------------------------------------------
  // Customers (Nasabah)
  // -------------------------------------------------------
  export const dummyCustomers: Customer[] = [
    {
      id: "C0001",
      name: "Ahmad Subagja",
      phone: "081234567890",
      address: "Jl. Mawar No. 10, Jakarta Selatan",
      email: "ahmad@example.com",
      idNumber: "3175020501800001",
      totalWaste: 125.5,
      totalReward: 350000,
      joinDate: "2023-01-15",
      status: "active",
      notes: "Nasabah aktif"
    },
    {
      id: "C0002",
      name: "Siti Aminah",
      phone: "081298765432",
      address: "Jl. Melati No. 23, Jakarta Timur",
      totalWaste: 87.2,
      totalReward: 220000,
      joinDate: "2023-02-20",
      status: "active",
      notes: ""
    },
    {
      id: "C0003",
      name: "Budi Santoso",
      phone: "08567890123",
      address: "Jl. Dahlia No. 45, Jakarta Barat",
      email: "budi@example.com",
      totalWaste: 210.8,
      totalReward: 520000,
      joinDate: "2023-01-05",
      status: "active",
      notes: "Nasabah dengan kontribusi terbanyak"
    },
    {
      id: "C0004",
      name: "Dewi Lestari",
      phone: "081345678901",
      address: "Jl. Anggrek No. 12, Jakarta Utara",
      idNumber: "3172045203900002",
      totalWaste: 65.3,
      totalReward: 180000,
      joinDate: "2023-03-10",
      status: "active",
      notes: ""
    },
    {
      id: "C0005",
      name: "Eko Prabowo",
      phone: "085678901234",
      address: "Jl. Flamboyan No. 8, Jakarta Pusat",
      totalWaste: 42.1,
      totalReward: 105000,
      joinDate: "2023-04-05",
      status: "inactive",
      notes: "Tidak aktif sejak Juni 2023"
    },
    {
      id: "C0006",
      name: "Fina Rahmawati",
      phone: "089876543210",
      address: "Jl. Teratai No. 17, Jakarta Selatan",
      email: "fina@example.com",
      totalWaste: 93.7,
      totalReward: 270000,
      joinDate: "2023-02-28",
      status: "active",
      notes: ""
    },
    {
      id: "C0007",
      name: "Gunawan Wibowo",
      phone: "081234987654",
      address: "Jl. Kenanga No. 33, Jakarta Timur",
      idNumber: "3175020907850003",
      totalWaste: 118.2,
      totalReward: 310000,
      joinDate: "2023-01-20",
      status: "active",
      notes: "Rutin setor sampah setiap minggu"
    },
    {
      id: "C0008",
      name: "Hani Susanti",
      phone: "085678123456",
      address: "Jl. Cempaka No. 27, Jakarta Barat",
      totalWaste: 33.5,
      totalReward: 95000,
      joinDate: "2023-04-12",
      status: "inactive",
      notes: "Pindah alamat"
    },
    {
      id: "C0009",
      name: "Irfan Hakim",
      phone: "081345678912",
      address: "Jl. Seroja No. 19, Jakarta Utara",
      email: "irfan@example.com",
      totalWaste: 78.6,
      totalReward: 200000,
      joinDate: "2023-03-01",
      status: "active",
      notes: ""
    },
    {
      id: "C0010",
      name: "Juwita Pratiwi",
      phone: "089876123456",
      address: "Jl. Kamboja No. 22, Jakarta Pusat",
      idNumber: "3172044505920004",
      totalWaste: 104.3,
      totalReward: 290000,
      joinDate: "2023-02-10",
      status: "active",
      notes: "Fokus pada sampah plastik"
    }
  ];
  
  // -------------------------------------------------------
  // Transactions and Transaction Items
  // -------------------------------------------------------
  export const dummyTransactions: Transaction[] = [
    {
      id: "T0001",
      tps_id: "1",
      type: "cash",
      nasabah_id: "C0001",
      date: "2023-10-01T10:30:00Z",
      amount: 30000,
      status: "success",
      notes: "Transaksi pertama",
      items: []
    },
    {
      id: "T0002",
      tps_id: "1",
      type: "transfer",
      nasabah_id: "C0003",
      date: "2023-10-02T14:45:00Z",
      amount: 45000,
      status: "success",
      notes: "",
      items: []
    },
    {
      id: "T0003",
      tps_id: "2",
      type: "cash",
      nasabah_id: "C0004",
      date: "2023-10-03T09:15:00Z",
      amount: 18000,
      status: "success",
      notes: "",
      items: []
    },
    {
      id: "T0004",
      tps_id: "2",
      type: "qris",
      nasabah_id: "C0007",
      date: "2023-10-04T13:20:00Z",
      amount: 37500,
      status: "success",
      notes: "",
      items: []
    },
    {
      id: "T0005",
      tps_id: "1",
      type: "cash",
      nasabah_id: "C0002",
      date: "2023-10-05T11:00:00Z",
      amount: 22500,
      status: "success",
      notes: "",
      items: []
    },
    {
      id: "T0006",
      tps_id: "5",
      type: "transfer",
      date: "2023-10-06T10:10:00Z",
      amount: 120000,
      status: "success",
      notes: "Pengumpulan kolektif RT 05",
      items: []
    },
    {
      id: "T0007",
      tps_id: "1",
      type: "cash",
      nasabah_id: "C0006",
      date: "2023-10-07T15:30:00Z",
      amount: 29500,
      status: "success",
      notes: "",
      items: []
    },
    {
      id: "T0008",
      tps_id: "3",
      type: "qris",
      nasabah_id: "C0009",
      date: "2023-10-08T12:45:00Z",
      amount: 27000,
      status: "pending",
      notes: "Menunggu konfirmasi pembayaran",
      items: []
    },
    {
      id: "T0009",
      tps_id: "4",
      type: "transfer",
      date: "2023-10-09T09:00:00Z",
      amount: 320000,
      status: "success",
      notes: "Pengiriman ke pengolah akhir",
      items: []
    },
    {
      id: "T0010",
      tps_id: "2",
      type: "cash",
      nasabah_id: "C0010",
      date: "2023-10-10T14:20:00Z",
      amount: 33500,
      status: "canceled",
      notes: "Dibatalkan karena kesalahan penimbangan",
      items: []
    }
  ];
  
  // Populate transaction items
  // Update transaction items in transactions array

    
  export const dummyTransactionItems: TransactionItem[] = [
    {
      id: "TI0001",
      transaction_id: "T0001",
      waste_partner_id: 2,
      weight: 5.2,
      price_per_kg: 2500,
      amount: 13000
    },
    {
      id: "TI0002",
      transaction_id: "T0001",
      waste_partner_id: 3,
      weight: 5.7,
      price_per_kg: 3000,
      amount: 17100
    },
    {
      id: "TI0003",
      transaction_id: "T0002",
      waste_partner_id: 4,
      weight: 10.2,
      price_per_kg: 2000,
      amount: 20400
    },
    {
      id: "TI0004",
      transaction_id: "T0002",
      waste_partner_id: 2,
      weight: 9.8,
      price_per_kg: 2500,
      amount: 24500
    },
    {
      id: "TI0005",
      transaction_id: "T0003",
      waste_partner_id: 5,
      weight: 5.1,
      price_per_kg: 3500,
      amount: 17850
    },
    {
      id: "TI0006",
      transaction_id: "T0004",
      waste_partner_id: 7,
      weight: 7.5,
      price_per_kg: 5000,
      amount: 37500
    },
    {
      id: "TI0007",
      transaction_id: "T0005",
      waste_partner_id: 2,
      weight: 6.8,
      price_per_kg: 2500,
      amount: 17000
    },
    {
      id: "TI0008",
      transaction_id: "T0005",
      waste_partner_id: 3,
      weight: 1.8,
      price_per_kg: 3000,
      amount: 5400
    },
    {
      id: "TI0009",
      transaction_id: "T0006",
      waste_partner_id: 13,
      weight: 20.0,
      price_per_kg: 2400,
      amount: 48000
    },
    {
      id: "TI0010",
      transaction_id: "T0006",
      waste_partner_id: 14,
      weight: 22.5,
      price_per_kg: 3200,
      amount: 72000
    },
    {
      id: "TI0011",
      transaction_id: "T0007",
      waste_partner_id: 3,
      weight: 9.5,
      price_per_kg: 3000,
      amount: 28500
    },
    {
      id: "TI0012",
      transaction_id: "T0007",
      waste_partner_id: 1,
      weight: 1.0,
      price_per_kg: 1000,
      amount: 1000
    },
    {
      id: "TI0013",
      transaction_id: "T0008",
      waste_partner_id: 8,
      weight: 6.3,
      price_per_kg: 2300,
      amount: 14490
    },
    {
      id: "TI0014",
      transaction_id: "T0008",
      waste_partner_id: 9,
      weight: 4.5,
      price_per_kg: 2800,
      amount: 12600
    },
    {
      id: "TI0015",
      transaction_id: "T0009",
      waste_partner_id: 10,
      weight: 80.0,
      price_per_kg: 2500,
      amount: 200000
    },
    {
      id: "TI0016",
      transaction_id: "T0009",
      waste_partner_id: 11,
      weight: 22.0,
      price_per_kg: 5500,
      amount: 121000
    },
    {
      id: "TI0017",
      transaction_id: "T0010",
      waste_partner_id: 5,
      weight: 7.0,
      price_per_kg: 3500,
      amount: 24500
    },
    {
      id: "TI0018",
      transaction_id: "T0010",
      waste_partner_id: 6,
      weight: 4.1,
      price_per_kg: 2200,
      amount: 9020
    }
  ];

  
  dummyTransactions.forEach(transaction => {
    transaction.items = dummyTransactionItems.filter(item => item.transaction_id === transaction.id);
  });
  
  // -------------------------------------------------------
  // Records
  // -------------------------------------------------------
  export const dummyRecordItems: RecordItem[] = [
    {
      id: "RI0001",
      record_id: "R0001",
      waste_partner_id: 2,
      unit: "kg",
      measure: 5.2
    },
    {
      id: "RI0002",
      record_id: "R0001",
      waste_partner_id: 3,
      unit: "kg",
      measure: 5.7
    },
    {
      id: "RI0003",
      record_id: "R0002",
      waste_partner_id: 4,
      unit: "kg",
      measure: 10.2
    },
    {
      id: "RI0004",
      record_id: "R0002",
      waste_partner_id: 2,
      unit: "kg",
      measure: 9.8
    },
    {
      id: "RI0005",
      record_id: "R0003",
      waste_partner_id: 5,
      unit: "kg",
      measure: 5.1
    },
    {
      id: "RI0006",
      record_id: "R0004",
      waste_partner_id: 7,
      unit: "kg",
      measure: 7.5
    },
    {
      id: "RI0007",
      record_id: "R0005",
      waste_partner_id: 2,
      unit: "kg",
      measure: 6.8
    },
    {
      id: "RI0008",
      record_id: "R0005",
      waste_partner_id: 3,
      unit: "kg",
      measure: 1.8
    },
    {
      id: "RI0009",
      record_id: "R0006",
      waste_partner_id: 13,
      unit: "kg",
      measure: 20.0
    },
    {
      id: "RI0010",
      record_id: "R0006",
      waste_partner_id: 14,
      unit: "kg",
      measure: 22.5
    },
    {
      id: "RI0011",
      record_id: "R0007",
      waste_partner_id: 3,
      unit: "kg",
      measure: 9.5
    },
    {
      id: "RI0012",
      record_id: "R0007",
      waste_partner_id: 1,
      unit: "kg",
      measure: 1.0
    },
    {
      id: "RI0013",
      record_id: "R0008",
      waste_partner_id: 8,
      unit: "kg",
      measure: 6.3
    },
    {
      id: "RI0014",
      record_id: "R0008",
      waste_partner_id: 9,
      unit: "kg",
      measure: 4.5
    },
    {
      id: "RI0015",
      record_id: "R0009",
      waste_partner_id: 10,
      unit: "kg",
      measure: 80.0
    },
    {
      id: "RI0016",
      record_id: "R0009",
      waste_partner_id: 11,
      unit: "kg",
      measure: 22.0
    },
    {
      id: "RI0017",
      record_id: "R0010",
      waste_partner_id: 5,
      unit: "kg",
      measure: 7.0
    },
    {
      id: "RI0018",
      record_id: "R0010",
      waste_partner_id: 6,
      unit: "kg",
      measure: 4.1
    },
    {
      id: "RI0019",
      record_id: "R0011",
      waste_partner_id: 8,
      unit: "kg",
      measure: 10.5
    },
    {
      id: "RI0020",
      record_id: "R0012",
      waste_partner_id: 10,
      unit: "kg",
      measure: 30.0
    },
    {
      id: "RI0021",
      record_id: "R0013",
      waste_partner_id: 3,
      unit: "kg",
      measure: 15.0
    },
    {
      id: "RI0022",
      record_id: "R0014",
      waste_partner_id: 11,
      unit: "kg",
      measure: 18.5
    },
    {
      id: "RI0023",
      record_id: "R0015",
      waste_partner_id: 2,
      unit: "kg",
      measure: 12.5
    },
    {
      id: "RI0024",
      record_id: "R0015",
      waste_partner_id: 3,
      unit: "kg",
      measure: 8.0
    }
  ];

export const dummyRecords: Record[] = [
  {
    id: "R0001",
    partner_id: 1,
    pic_id: 101,
    total: 30000, // 5.2 * 2500 + 5.7 * 3000
    datetime: "2023-10-01T10:30:00Z",
    status: "received",
    is_sell: false,
    is_process: false,
    transaction_id: "T0001",
    notes: "Kertas dan botol plastik dari Ahmad Subagja",
    items: [] // Will be populated below
  },
  {
    id: "R0002",
    partner_id: 1,
    pic_id: 102,
    total: 45000, // 10.2 * 2000 + 9.8 * 2500
    datetime: "2023-10-02T14:45:00Z",
    status: "received",
    is_sell: false,
    is_process: false,
    transaction_id: "T0002",
    notes: "Kardus dan kertas dari Budi Santoso",
    items: []
  },
  {
    id: "R0003",
    partner_id: 2,
    pic_id: 103,
    total: 17850, // 5.1 * 3500
    datetime: "2023-10-03T09:15:00Z",
    status: "received",
    is_sell: false,
    is_process: false,
    transaction_id: "T0003",
    notes: "Botol plastik dari Dewi Lestari",
    items: []
  },
  {
    id: "R0004",
    partner_id: 2,
    pic_id: 101,
    total: 37500, // 7.5 * 5000
    datetime: "2023-10-04T13:20:00Z",
    status: "received",
    is_sell: false,
    is_process: false,
    transaction_id: "T0004",
    notes: "Kaleng aluminium dari Gunawan Wibowo",
    items: []
  },
  {
    id: "R0005",
    partner_id: 1,
    pic_id: 104,
    total: 22400, // 6.8 * 2500 + 1.8 * 3000
    datetime: "2023-10-05T11:00:00Z",
    status: "received",
    is_sell: false,
    is_process: false,
    transaction_id: "T0005",
    notes: "Kertas dan botol plastik dari Siti Aminah",
    items: []
  },
  {
    id: "R0006",
    partner_id: 5,
    pic_id: 105,
    total: 120000, // 20.0 * 2400 + 22.5 * 3200
    datetime: "2023-10-06T10:10:00Z",
    status: "received",
    is_sell: false,
    is_process: false,
    transaction_id: "T0006",
    notes: "Kertas dan botol plastik dari pengumpulan kolektif RT 05",
    items: []
  },
  {
    id: "R0007",
    partner_id: 1,
    pic_id: 102,
    total: 29500, // 9.5 * 3000 + 1.0 * 1000
    datetime: "2023-10-07T15:30:00Z",
    status: "received",
    is_sell: false,
    is_process: false,
    transaction_id: "T0007",
    notes: "Botol plastik dan sisa makanan dari Fina Rahmawati",
    items: []
  },
  {
    id: "R0008",
    partner_id: 3,
    pic_id: 103,
    total: 27000, // 6.3 * 2300 + 4.5 * 2800
    datetime: "2023-10-08T12:45:00Z",
    status: "processed",
    is_sell: false,
    is_process: true,
    transaction_id: "T0008",
    processed_to: "R0011",
    notes: "Kertas dan botol plastik dari Irfan Hakim, diproses untuk daur ulang",
    items: []
  },
  {
    id: "R0009",
    partner_id: 4,
    pic_id: 105,
    total: 320000, // 80.0 * 2500 + 22.0 * 5500
    datetime: "2023-10-09T09:00:00Z",
    status: "shipped",
    is_sell: true,
    is_process: false,
    selling_price: 3000, // Higher than buying price
    transaction_id: "T0009",
    source: "Hasil olahan dari beberapa nasabah",
    notes: "Pengiriman kardus dan kaleng aluminium ke pengolah akhir",
    items: []
  },
  {
    id: "R0010",
    partner_id: 2,
    pic_id: 104,
    total: 33500, // 7.0 * 3500 + 4.1 * 2200
    datetime: "2023-10-10T14:20:00Z",
    status: "canceled",
    is_sell: false,
    is_process: false,
    transaction_id: "T0010",
    notes: "Botol plastik dan kardus dari Juwita Pratiwi, dibatalkan",
    items: []
  },
  // Additional records to showcase all features
  {
    id: "R0011",
    partner_id: 3,
    pic_id: 105,
    total: 24150, // 10.5 * 2300
    datetime: "2023-10-11T10:00:00Z",
    status: "shipped",
    is_sell: true,
    is_process: false,
    selling_price: 2700,
    discount: 5, // 5% discount
    source: "Hasil proses dari R0008",
    notes: "Bahan kertas daur ulang",
    items: []
  },
  {
    id: "R0012",
    partner_id: 4,
    pic_id: 101,
    total: 75000, // 30.0 * 2500
    datetime: "2023-10-12T13:30:00Z",
    status: "shipped",
    is_sell: true,
    is_process: false,
    selling_price: 3200,
    discount: 0,
    notes: "Kardus quality A untuk pabrik kertas",
    items: []
  },
  {
    id: "R0013",
    partner_id: 1,
    pic_id: 102,
    total: 45000, // 15.0 * 3000
    datetime: "2023-10-13T09:45:00Z",
    status: "processed",
    is_sell: false,
    is_process: true,
    processed_to: "R0014",
    notes: "Botol plastik untuk daur ulang premium",
    items: []
  },
  {
    id: "R0014",
    partner_id: 4,
    pic_id: 103,
    total: 101750, // 18.5 * 5500
    datetime: "2023-10-14T11:15:00Z",
    status: "shipped",
    is_sell: true,
    is_process: false,
    selling_price: 6000,
    source: "Hasil proses dari R0013",
    notes: "Aluminium daur ulang kualitas tinggi",
    items: []
  },
  {
    id: "R0015",
    partner_id: 1,
    pic_id: 104,
    total: 55250, // 12.5 * 2500 + 8.0 * 3000
    datetime: "2023-10-15T14:00:00Z",
    status: "received",
    is_sell: false,
    is_process: false,
    discount: 10, // 10% discount special promotion
    notes: "Kertas dan botol plastik dari program sekolah",
    items: []
  }
];  
  // -------------------------------------------------------
  // API Response Dummy Data (for React Query)
  // -------------------------------------------------------
  
  // Waste Category Response
  export const dummyWasteCategoryResponse = {
    categories: dummyWasteCategories,
  };
  
  // Waste List Response
  export const dummyWasteListResponse = {
    wastes: dummyWastes,
    totalCount: dummyWastes.length,
    page: 1,
    limit: 10
  };
  
  // Waste Partner List Response
  export const dummyWastePartnerListResponse = {
    wastePartners: dummyWastePartners,
    wastesDetails: dummyWastes.map(waste => ({
      id: waste.id,
      name: waste.name,
      slug: waste.slug,
      isAccepted: waste.isAccepted,
      status: waste.status,
      description: waste.description,
      categoryName: dummyWasteCategories.find(cat => cat.id === waste.categoryId)?.name || 'Unknown'
    })),
    totalCount: dummyWastePartners.length,
    page: 1,
    limit: 10
  };
  
  // Customer List Response
  export const dummyCustomerListResponse = {
    customers: dummyCustomers,
    totalCount: dummyCustomers.length,
    page: 1,
    limit: 10
  };
  
  // Transaction List Response
  export const dummyTransactionListResponse = {
    transactions: dummyTransactions,
    totalCount: dummyTransactions.length,
    page: 1,
    limit: 10
  };
  
  // Record List Response
  export const dummyRecordListResponse = {
    records: dummyRecords,
    totalCount: dummyRecords.length,
    page: 1,
    limit: 10
  };
  
  // Detail response generators
  export const getWasteResponse = (id: number) => {
    const waste = dummyWastes.find(w => w.id === id);
    return waste ? { waste } : null;
  };
  
  export const getWastePartnerResponse = (id: number) => {
    const wastePartner = dummyWastePartners.find(wp => wp.id === id);
    if (!wastePartner) return null;
    
    const waste = dummyWastes.find(w => w.id === wastePartner.waste_id);
    const partner = dummyPartners.find(p => p.id === wastePartner.partner_id);
    const category = waste ? dummyWasteCategories.find(c => c.id === waste.categoryId) : null;
    
    return {
      wastePartner,
      wasteName: waste?.name || 'Unknown',
      wasteCategory: category?.name || 'Unknown',
      wasteDescription: waste?.description || '',
      partnerName: partner?.display_name || 'Unknown'
    };
  };
  
  export const getCustomerResponse = (id: string) => {
    const customer = dummyCustomers.find(c => c.id === id);
    return customer ? { customer } : null;
  };
  
  export const getTransactionResponse = (id: string) => {
    const transaction = dummyTransactions.find(t => t.id === id);
    if (!transaction) return null;
    
    const items = dummyTransactionItems.filter(item => item.transaction_id === id);
    const customer = transaction.nasabah_id ? dummyCustomers.find(c => c.id === transaction.nasabah_id) : null;
    const tps = dummyPartners.find(p => p.id.toString() === transaction.tps_id);
    
    return {
      transaction,
      items,
      customerName: customer?.name || undefined,
      tpsName: tps?.display_name || 'Unknown'
    };
  };
  
  export const getRecordResponse = (id: string) => {
    const record = dummyRecords.find(r => r.id === id);
    if (!record) return null;
    
    const wastePartner = dummyWastePartners.find(wp => wp.id === record.partner_id);
    const waste = wastePartner ? dummyWastes.find(w => w.id === wastePartner.waste_id) : null;
    const partner = dummyPartners.find(p => p.id === record.partner_id);
    
    return {
      record,
      wasteName: waste?.name || 'Unknown',
      partnerName: partner?.display_name || 'Unknown'
    };
  };