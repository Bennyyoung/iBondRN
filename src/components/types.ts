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