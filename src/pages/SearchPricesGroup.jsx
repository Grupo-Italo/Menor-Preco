import { Box } from "@mui/material"
import { Header } from "../components/Header"
import { SearchGroups } from "../components/SearchGroups"
import { useState } from "react";

function SearchPricesGroup() {
    const [productsData, setProductsData] = useState(null);

    return (
        <>
            <Header />
            <Box sx={{ mt: 8, px: 1 }}>
                <SearchGroups onDataFetched={setProductsData}/>
            </Box>
        </>
    )
}

export default SearchPricesGroup