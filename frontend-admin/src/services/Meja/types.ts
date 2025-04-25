export interface Meja {
  id: string;
  number: string;
  capacity: number;
  status: "available" | "occupied" | "reserved";
  location: "indoor" | "outdoor";
  createdAt: Date;
  updatedAt: Date;
}

export interface MejaCreatePayload {
  number: string;
  capacity: number;
  status?: "available" | "occupied" | "reserved";
  location: "indoor" | "outdoor";
}

export interface MejaUpdatePayload {
  number?: string;
  capacity?: number;
  status?: "available" | "occupied" | "reserved";
  location?: "indoor" | "outdoor";
}
