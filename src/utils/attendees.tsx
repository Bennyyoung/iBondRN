import OrganizerPicture from "@/assets/svg/organizerPicture.svg"

const attendees = [
    {
        id: 1,
        userName: 'Ayo Mide',
        handle: '@username',
        university: 'Ambrose Ali University',
        profileImage: <OrganizerPicture width={40} height={40} />, // Placeholder component for the user's profile image
        followText: 'Follow',
    },
    {
        id: 2,
        userName: 'Lana Smith',
        handle: '@lana',
        university: 'Babcock University',
        profileImage: <OrganizerPicture width={40} height={40} />,
        followText: 'Follow',
    },
    {
        id: 3,
        userName: 'John Doe',
        handle: '@john',
        university: 'Harvard University',
        profileImage: <OrganizerPicture width={40} height={40} />,
        followText: 'Follow',
    },
];

export default attendees