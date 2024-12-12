export interface NotificationType {
  id: string;
  message: string;
  createdAt: string;
  phone?: string;
}

export interface NotificationResponse {
  content: NotificationType;
  id: string;
  created_at: string;
  is_read: boolean;
}
