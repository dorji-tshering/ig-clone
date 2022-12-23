import InstantSearch from "../components/InstantSearch"

const SearchMobile = () => {
    return (
        <div className="pb-24">
            <div className="px-5 bg-white shadow-mainShadow">
                <div className="relative md:max-w-lg mx-auto">
                        <InstantSearch onSearchPage={true}/>
                </div>
            </div>
        </div>
    )
}

export default SearchMobile