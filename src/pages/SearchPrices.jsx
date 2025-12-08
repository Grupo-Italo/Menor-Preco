import { Header } from "../components/Header"
import { Listing } from "../components/Listing"
import { Metrics } from "../components/Metrics"
import { Search } from "../components/Search"

function SearchPrices() {
    return (
        <>
            <Header />
            <Search />
            <Metrics />
            <Listing />
        </>
    )
}

export default SearchPrices