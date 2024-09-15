import Box from "@/components/Box"
import TitleBar from "@/components/TitleBar/TitleBar"
import PlusIcon from "@/assets/svg/plusIcon.svg"
import Text from "@/components/Text"
import { ScrollView } from "react-native-gesture-handler"
import { StyleSheet } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
import Title from "@/components/Title/Title"
import CalendarIcon from '@/assets/svg/calender.svg'
import { SearchBar } from "@/components/SearchBar"
import SearchBarIcon from '@/assets/svg/searchIcon.svg'
import CorporateIcon from '@/assets/svg/corporate.svg'

const Events: React.FC = () => {

    const eventsNavigation = [
        {
            id: 1,
            icon: <CorporateIcon />,
            linkName: 'Corporate',
            linkUrl: ''
        },
        {
            id: 2,
            icon: <CorporateIcon />,
            linkName: 'Corporate',
            linkUrl: ''
        },
        {
            id: 3,
            icon: <CorporateIcon />,
            linkName: 'Corporate',
            linkUrl: ''
        },
        {
            id: 4,
            icon: <CorporateIcon />,
            linkName: 'Corporate',
            linkUrl: ''
        },
        {
            id: 5,
            icon: <CorporateIcon />,
            linkName: 'Corporate',
            linkUrl: ''
        },
        {
            id: 6,
            icon: <CorporateIcon />,
            linkName: 'Corporate',
            linkUrl: ''
        },
        {
            id: 7,
            icon: <CorporateIcon />,
            linkName: 'Corporate',
            linkUrl: ''
        },
    ]

    return (
        <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: '#fff' }}>
            <TitleBar>
                <Box style={styles.title}>
                    <PlusIcon />
                    <Text variant={'subHeading'} style={{ color: '#6500E0' }}>My Event</Text>
                </Box>
            </TitleBar>

            <Title icon={<CalendarIcon />}>
                Events
            </Title>

            <Box paddingHorizontal={'md'}>
                <SearchBar
                    placeholder="Search"
                    backgroundColor="#FBF7FF"
                    height={RFValue(40)}
                    borderRadius={RFValue(12)}
                    svgIcon={<SearchBarIcon />}
                />
            </Box>

            <Box marginTop={'Ml'} style={styles.gridContainer}>
                {
                    eventsNavigation.map(events => (
                        <Box key={events.id} style={styles.gridItem}>
                            <Box style={styles.iconCircle}>
                                {events.icon}
                            </Box>
                            <Text>Corporate</Text>
                        </Box>
                    ))
                }
            </Box>
        </ScrollView>
    )
}

export default Events

const styles = StyleSheet.create({
    title: {
        paddingVertical: RFValue(10),
        paddingRight: RFValue(16),
        paddingLeft: RFValue(0),
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 0.29,
        gap: 16
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: RFValue(16)
    },
    gridItem: {
        width: '22%',
        alignItems: 'center',
        marginBottom: 20
    },
    iconCircle: {
        backgroundColor: '#F4EBFF',
        padding: RFValue(12),
        borderRadius: RFValue(1500),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: RFValue(10)
    }
})