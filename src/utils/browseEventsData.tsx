import React from 'react';
import { SvgIcon } from '@/assets/icons/SvgIcon';

export const eventsNavigation = [
    {
        id: 1,
        icon: <SvgIcon name="corporate" size='sml' />,
        categoryName: 'Corporate',
        linkUrl: ''
    },
    {
        id: 2,
        icon: <SvgIcon name="education" size='sml' />,
        categoryName: 'Education',
        linkUrl: ''
    },
    {
        id: 3,
        icon: <SvgIcon name="career" size='sml' />,
        categoryName: 'Career',
        linkUrl: ''
    },
    {
        id: 4,
        icon: <SvgIcon name="culture" size='sml' />,
        categoryName: 'Culture',
        linkUrl: ''
    },
    {
        id: 5,
        icon: <SvgIcon name="entertainment" size='sml' />,
        categoryName: 'Entertainment',
        linkUrl: ''
    },
    {
        id: 6,
        icon: <SvgIcon name="social" size='sml' />,
        categoryName: 'Social',
        linkUrl: ''
    },
    {
        id: 7,
        icon: <SvgIcon name="sport" size='sml' />,
        categoryName: 'Sport',
        linkUrl: ''
    },
];

export const commentData = [
    {
        id: 1,
        profileImage: <SvgIcon name="organizerPicture" width={'24'} height={'24'} />,
        userName: 'Lana Smith',
        userUniversity: "Babcock University",
        timeAgo: '2d',
        commentText: 'Soundcloud is blue, instagram is not threads, Uber was already black and grey, not sure what that ET thing is , the only one that has gone black in this list is Twitter.',
        subComments: [
            {
                id: 1,
                userName: 'Lana Smith',
                profileImage: <SvgIcon name="organizerPicture" width={'24'} height={'24'} />,
                userUniversity: "Babcock University",
                timeAgo: '2d',
                commentText: 'ET thing is, the only one that has gone black in this list is Twitter.',
                followText: "Follow"
            },
            {
                id: 2,
                userName: 'Lana Smith',
                profileImage: <SvgIcon name="organizerPicture" width={'24'} height={'24'} />,
                userUniversity: "Babcock University",
                timeAgo: '2d',
                commentText: '',
                gifImage: <SvgIcon name="gif" size="md" />
            },
            {
                id: 3,
                userName: 'Lana Smith',
                profileImage: <SvgIcon name="organizerPicture" width={'24'} height={'24'} />,
                userUniversity: "Babcock University",
                timeAgo: '2d',
                commentText: 'Uber was already black and grey, not sure what that ET thing is , the only one that has gone black.',
            },
            {
                id: 3,
                userName: 'Lana Smith',
                profileImage: <SvgIcon name="organizerPicture" width={'24'} height={'24'} />,
                userUniversity: "Babcock University",
                timeAgo: '2d',
                commentText: 'Uber was already black and grey, not sure what that ET thing is , the only one that has gone black.',
            }
        ]
    },
    {
        id: 2,
        userName: 'Lana Smith',
        profileImage: <SvgIcon name="organizerPicture" width={'24'} height={'24'} />,
        userUniversity: "Babcock University",
        timeAgo: '2d',
        commentText: 'Soundcloud is blue, instagram is not threads, Uber was already black and grey, not sure what that ET thing is , the only one that has gone black in this list is Twitter.',
        followText: "Follow"
    },
    {
        id: 3,
        userName: 'Lana Smith',
        profileImage: <SvgIcon name="organizerPicture" width={'24'} height={'24'} />,
        userUniversity: "Babcock University",
        timeAgo: '2d',
        commentText: 'Soundcloud is blue, instagram is not threads, Uber was already black and grey, not sure what that ET thing is , the only one that has gone black in this list is Twitter.',
        followText: "Follow"
    },
]