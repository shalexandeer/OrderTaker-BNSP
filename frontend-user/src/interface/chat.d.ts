interface ChatMessage {
  id?: string;
  sessionId?: string;
  departmentId: number;
  roomNo: string;
  guestName: string;
  owner?: string;
  message: string;
  timestamp?: string;
}