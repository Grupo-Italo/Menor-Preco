import { Header } from "../components/Header"
import { Listing } from "../components/Listing"
import { Metrics } from "../components/Metrics"
import { Search } from "../components/Search"
import Box from '@mui/material/Box'

function SearchPrices() {
    return (
        <>
            <Header />
            <Box sx={{ mt: 10, px: 2 }}>
                <Search />
                <Metrics />
                <Listing />
            </Box>
        </>
    )
}

export default SearchPrices