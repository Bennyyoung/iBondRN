import React from "react";
import UsersBox from "@/components/UsersBox/UsersBox"
import users from "@/utils/users"
import { Event, User } from "@/components/types";

const EventAttendees = ({ event }: { event: Event }) => {
    return (
        <>
            <UsersBox
                users={event.attendees}
                type="attendees"
            />
        </>
    )
}

export default EventAttendees

