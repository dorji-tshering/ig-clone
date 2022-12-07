import InstantSearch from "../components/InstantSearch"

const SearchMobile = () => {
    return (
        <div className="pageContent px-5">
            <div className="relative md:max-w-lg mx-auto">
                    <InstantSearch onSearchPage={true}/>
            </div>
        </div>
    )
}

export default SearchMobile