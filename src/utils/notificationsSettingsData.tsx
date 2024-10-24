export const notifications = [
    { id: 1, label: 'Posts & comments', options: ['Push', 'Email', 'SMS'], link: 'PostsAndComments', },
    { id: 2, label: 'Tags and mentions', options: ['Push', 'Email', 'SMS'], link: 'TagsAndMentions' },
    { id: 3, label: 'New followers', options: ['Push', 'Email', 'SMS'], link: 'NewFollowers' },
    { id: 4, label: 'Share, likes, reposts', options: ['Push', 'Email', 'SMS'], link: 'SharesLikesReposts' },
    { id: 5, label: 'Profile views', options: ['Push', 'Email', 'SMS'], link: 'ProfileViews' },
    { id: 6, label: 'Messaging', options: ['Push', 'Email', 'SMS'], link: 'MessagingNotification' },
    { id: 7, label: 'Suggested posts', options: ['Push', 'Email', 'SMS'], link: 'SuggestedPosts' },
    { id: 8, label: 'People you may know', options: ['Push', 'Email', 'SMS'], link: 'PeopleYouMayKnow' },
    { id: 9, label: 'Events', options: ['Push', 'Email', 'SMS'], link: 'EventsSettings' },
    { id: 10, label: 'Live video', options: ['Push', 'Email'], link: 'LiveVideo' },
    { id: 11, label: 'Marketplace', options: ['Push', 'Email', 'SMS'], link: 'MarketPlace' },
    { id: 12, label: 'Life event', options: ['Push'], link: 'LifeEvents' },
    { id: 13, label: 'Newsletter', options: ['Push', 'Email'], link: 'Newsletter' },
    { id: 14, label: 'Promotion', options: ['Push', 'Email'], link: 'Promotion' },
    { id: 15, label: 'App update', options: ['Push'], link: 'AppUpdate' },
    { id: 16, label: 'Other notifications', options: ['Push', 'Email', 'SMS'], link: 'OtherNotifications' },
]

export const commonDataInNotificationsSettings = [
    {
        id: 1,
        label: "Push notification",
        sublabel: "Pushed to your device immediately",
        switchProps: {
            value: true, // Switch is turned on
            onValueChange: (newValue: boolean) => {
                console.log("Push notification switched to: ", newValue);
            },
        },
    },
    {
        id: 2,
        label: "Email",
        sublabel: "Sent to your primary email",
        switchProps: {
            value: true, // Switch is turned on
            onValueChange: (newValue: boolean) => {
                console.log("Email switched to: ", newValue);
            },
        },
    },
    {
        id: 3,
        label: "SMS",
        sublabel: "Sent to your main phone number",
        switchProps: {
            value: true, // Switch is turned on
            onValueChange: (newValue: boolean) => {
                console.log("SMS switched to: ", newValue);
            },
        },
    },
];
