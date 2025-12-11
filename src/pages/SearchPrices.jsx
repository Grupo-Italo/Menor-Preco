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
            <Box sx={{ mt: 8, px: 1 }}>
                <Search onDataFetched={setProductsData} />
                <Metrics data={productsData} />
                <Listing data={productsData} />
            </Box>
        </>
    )
}

export default SearchPrices