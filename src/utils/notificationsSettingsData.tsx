

export const notifications = [
    { id: 1, label: 'Posts & comments', options: ['Push', 'Email', 'SMS'], link: 'PostsAndCommentsScreen', },
    { id: 2, label: 'Tags and mentions', options: ['Push', 'Email', 'SMS'], link: 'TagsAndMentionsScreen' },
    { id: 3, label: 'New followers', options: ['Push', 'Email', 'SMS'], link: 'NewFollowersScreen' },
    { id: 4, label: 'Share, likes, reposts', options: ['Push', 'Email', 'SMS'], link: 'SharesLikesRepostsScreen' },
    { id: 5, label: 'Profile views', options: ['Push', 'Email', 'SMS'], link: 'ProfileViewsScreen' },
    { id: 6, label: 'Messaging', options: ['Push', 'Email', 'SMS'], link: 'MessagingScreen' },
    { id: 7, label: 'Suggested posts', options: ['Push', 'Email', 'SMS'], link: 'SuggestedPostsScreen' },
    { id: 8, label: 'People you may know', options: ['Push', 'Email', 'SMS'], link: 'PeopleYouMayKnowScreen' },
    { id: 9, label: 'Events', options: ['Push', 'Email', 'SMS'], link: 'EventsSettingsScreen' },
    { id: 10, label: 'Live video', options: ['Push', 'Email'], link: 'LiveVideoScreen' },
    { id: 11, label: 'Marketplace', options: ['Push', 'Email', 'SMS'], link: 'MarketPlaceScreen' },
    { id: 12, label: 'Life event', options: ['Push'], link: 'LifeEventsScreen' },
    { id: 13, label: 'Newsletter', options: ['Push', 'Email'], link: 'NewsletterScreen' },
    { id: 14, label: 'Promotion', options: ['Push', 'Email'], link: 'PromotionScreen' },
    { id: 15, label: 'App update', options: ['Push'], link: 'AppUpdateScreen' },
    { id: 16, label: 'Other notifications', options: ['Push', 'Email', 'SMS'], link: 'OtherNotificationsScreen' },
]

export const commonDataInNotificationsSettings = [
    {
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
