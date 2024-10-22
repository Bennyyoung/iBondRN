import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import HomeIcon from "@/assets/svg/home.svg"
import ExploreIcon from '@/assets/svg/explore.svg'
import GiantPlusIcon from '@/assets/svg/giantPlus.svg'
import ChatsIcon from "@/assets/svg/chats.svg"
import ProfileIcon from "@/assets/svg/profile.svg"
import { RFValue } from "react-native-responsive-fontsize"
import CreateEvents from "@/screens/Events/CreateEvents/CreateEvents"
import BrowseEvents from "@/screens/Events/BrowseEvents/BrowseEvents"
import Settings from "@/screens/Settings/SettingsScreen"

const Tab = createBottomTabNavigator()

const BottomTab = () => {

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#FFFFFF',
                    paddingBottom: 40,
                    height: 98.15,
                    borderColor: '#FFFFFF'
                },
                tabBarActiveTintColor: '#4129A7', // Optional: Set active tab text color
                tabBarInactiveTintColor: '#878787', // Optional: Set inactive tab text color
                tabBarShowLabel: true, // Show or hide labels
                tabBarLabelStyle: {
                    fontSize: 13.7, // Optional: Customize the font size of the label,
                    fontWeight: '600',
                    // marginBottom: 10

                },

            }}
        >
            <Tab.Screen
                name="Home"
                component={BrowseEvents} // Temporal placeholder
                options={{
                    headerShown: false,
                    title: 'Home',
                    tabBarIcon: () => <HomeIcon />,
                    tabBarLabelStyle: {
                        fontSize: RFValue(11),
                        fontWeight: '400',
                        letterSpacing: RFValue(0.06),
                        lineHeight: RFValue(13)
                    }
                }}
            />
            <Tab.Screen
                name="Explore"
                component={BrowseEvents} // Temporal placeholder
                options={{
                    headerShown: false,
                    title: 'Explore',
                    tabBarIcon: () => <ExploreIcon />,
                    tabBarLabelStyle: {
                        fontSize: RFValue(11),
                        fontWeight: '400',
                        letterSpacing: RFValue(0.06),
                        lineHeight: RFValue(13)
                    }
                }}
            />
            <Tab.Screen
                name="CreateEvents"
                component={CreateEvents} // Temporal placeholder
                options={{
                    headerShown: false,
                    title: '',
                    tabBarIcon: () => <GiantPlusIcon />
                }}
            />
            <Tab.Screen
                name="Chats"
                component={CreateEvents} // Temporal placeholder
                options={{
                    headerShown: false,
                    title: 'Chats',
                    tabBarIcon: () => <ChatsIcon />,
                    tabBarLabelStyle: {
                        fontSize: RFValue(11),
                        fontWeight: '400',
                        letterSpacing: RFValue(0.06),
                        lineHeight: RFValue(13)
                    }
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Settings} // Temporal placeholder
                options={{
                    headerShown: false,
                    title: 'Profile',
                    tabBarIcon: () => <ProfileIcon />,
                    tabBarLabelStyle: {
                        fontSize: RFValue(11),
                        fontWeight: '400',
                        letterSpacing: RFValue(0.06),
                        lineHeight: RFValue(13)
                    }
                }}
            />

        </Tab.Navigator>
    )
}

export default BottomTab