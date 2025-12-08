import { Header } from "../components/Header"
import { Listing } from "../components/Listing"
import { Metrics } from "../components/Metrics"
import { Search } from "../components/Search"
import Box from '@mui/material/Box'
import { useState } from 'react'

function SearchPrices() {
    const [productsData, setProductsData] = useState(null);

    return (
        <>
            <Header />
            <Box sx={{ mt: 10, px: 2 }}>
                <Search onDataFetched={setProductsData} />
                <Metrics />
                <Listing data={productsData} />
            </Box>
        </>
    )
}

export default SearchPrices