import UsersBox from "@/components/UsersBox/UsersBox"
import users from "@/utils/users"
import { User } from "@/components/types";


const EventAttendees = () => {

    const attendees = users.filter((user: User) => user.isAttendee)
    return (
        <>
            <UsersBox
                users={attendees}
            />
        </>
    )
}

export default EventAttendees

