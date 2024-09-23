import ProfileIcon from "@/assets/svg/profile.svg"
import GifIcon from "@/assets/svg/gif.svg"
import OrganizerPicture from "@/assets/svg/organizerPicture.svg"

const commentData = [
    {
        id: 1,
        profileImage: <OrganizerPicture width={'24'} height={'24'} />,
        userName: 'Lana Smith',
        userUniversity: "Babcock University",
        timeAgo: '2d',
        commentText: 'Soundcloud is blue, instagram is not threads, Uber was already black and grey, not sure what that ET thing is , the only one that has gone black in this list is Twitter.',
        subComments: [
            {
                id: 1,
                userName: 'Lana Smith',
                profileImage: <OrganizerPicture width={'24'} height={'24'} />,
                userUniversity: "Babcock University",
                timeAgo: '2d',
                commentText: 'ET thing is, the only one that has gone black in this list is Twitter.',
                followText: "Follow"
            },
            {
                id: 2,
                userName: 'Lana Smith',
                profileImage: <OrganizerPicture width={'24'} height={'24'} />,
                userUniversity: "Babcock University",
                timeAgo: '2d',
                commentText: '',
                gifImage: <GifIcon />
            },
            {
                id: 3,
                userName: 'Lana Smith',
                profileImage: <OrganizerPicture width={'24'} height={'24'} />,
                userUniversity: "Babcock University",
                timeAgo: '2d',
                commentText: 'Uber was already black and grey, not sure what that ET thing is , the only one that has gone black.',
            },
            {
                id: 3,
                userName: 'Lana Smith',
                profileImage: <OrganizerPicture width={'24'} height={'24'} />,
                userUniversity: "Babcock University",
                timeAgo: '2d',
                commentText: 'Uber was already black and grey, not sure what that ET thing is , the only one that has gone black.',
            }
        ]
    },
    {
        id: 2,
        userName: 'Lana Smith',
        profileImage: <OrganizerPicture width={'24'} height={'24'} />,
        userUniversity: "Babcock University",
        timeAgo: '2d',
        commentText: 'Soundcloud is blue, instagram is not threads, Uber was already black and grey, not sure what that ET thing is , the only one that has gone black in this list is Twitter.',
        followText: "Follow"
    },
    {
        id: 3,
        userName: 'Lana Smith',
        profileImage: <OrganizerPicture width={'24'} height={'24'} />,
        userUniversity: "Babcock University",
        timeAgo: '2d',
        commentText: 'Soundcloud is blue, instagram is not threads, Uber was already black and grey, not sure what that ET thing is , the only one that has gone black in this list is Twitter.',
        followText: "Follow"
    },
]

export default commentData