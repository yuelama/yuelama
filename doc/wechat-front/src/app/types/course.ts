export interface Course {
  id: string;
  title: string;
  instructor: string;
  description: string;
  duration: string;
  price: number;
  category: string;
  imageUrl: string;
  availableSeats: number;
  location: string;
  schedules: string[];
}

export interface Order {
  id: string;
  courseId: string;
  courseTitle: string;
  instructor: string;
  selectedSchedule: string;
  orderDate: string;
  status: "pending" | "confirmed" | "cancelled";
  price: number;
  location: string;
}

export interface UserProfile {
  name: string;
  phone: string;
  email: string;
  avatar: string;
}
