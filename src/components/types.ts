import { ReactElement } from "react";

// types.ts
export interface Activity {
  id: number;
  image: string;
  title: string;
  date: string;
  time: string;
  type: string;
  platform: string;
}

export interface User {
  id: number;
  userName: string;
  handle: string;
  university: string;
  isOnline: boolean;
  profileImage: ReactElement;
  followText: string;
  isAttendee: boolean;
};

export interface Event {
  id: number;
  createdBy: string | null;
  lastModifiedBy: string | null;
  createdAt: string;
  updatedAt: string | null;
  eventTitle: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  eventType: "PHYSICAL" | "VIRTUAL";
  eventPrivacy: "PUBLIC" | "PRIVATE" | 'FOLLOWERS ONLY' | 'GROUP';
  category: string;
  hostName: string;
  eventUrl: string;
  attendees: any[]; // Assuming attendees are an empty array, you can replace 'any' with the correct type
  imageUrl: string;
  channel: string;
  eventStatus: "PENDING" | "ACTIVE" | "CANCELLED"; // Adjust if other statuses are possible
  otherDetails: string;
}

export interface EventResponse {
  status: number;
  message: string;
  data: {
    content: Event[];
  };
}

export interface SwitchProps {
  value: boolean;
  onValueChange: (newValue: boolean) => void;
}
