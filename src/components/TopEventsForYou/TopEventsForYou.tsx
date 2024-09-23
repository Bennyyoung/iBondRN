import { Box } from "lucide-react-native"
import { StyleSheet, VirtualizedList } from "react-native"
import Card from "../Card"
import SubTitle from "../SubTitle/SubTitle"
import eventDetails from "@/utils/eventDetails"

const getItem = (data: any, index: number) => data[index];
const getItemCount = (data: any) => data.length;

const styles = StyleSheet.create({
    flatListContainer: {
        paddingLeft: 16 // Add padding to align with other content
    },
})

const TopEventsForYou = () => {

    return (
        <>
            <SubTitle title={'Top Events For You'} subtitle='Show more' />

            <VirtualizedList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={eventDetails}
                keyExtractor={(item) => item.id.toString()}
                initialNumToRender={4}
                renderItem={({ item }) => {
                    if (item.eventStatus === 'Today') {
                        return (
                            <Card key={item.id} data={item} />
                        )
                    }
                    if (item.eventStatus === 'Tomorrow') {
                        return (
                            <Card key={item.id} data={item} />
                        )
                    }
                    return null
                }}
                // showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.flatListContainer}
                getItem={getItem}
                getItemCount={getItemCount}
            />
        </>
    )
}

export default TopEventsForYou