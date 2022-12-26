import Link from "next/link"
import classNames from 'classnames'
import { useEffect, useRef, useState } from "react"
import { TbSearch } from 'react-icons/tb'
import isMobile from '../utils/useMediaQuery'
import searchClient from '../utils/typeSense'
import { collection, onSnapshot } from "firebase/firestore"
import { db } from "../firebase"
import ContentLoader from '../contentLoaders/ContentLoader'

/**
 * Search component
 */
const InstantSearch = ({onSearchPage = false}: {onSearchPage?: boolean}) => {
    const [active, setActive] = useState(false)
    const [query, setQuery] = useState<string>('')
    const [searchResults, setSearchResults] = useState<any[]>()
    const ref = useRef<any>(null)
    const isMb = isMobile()
    const [loading, setLoading] = useState(false)

    // listen to user document changes and update the search collection
    useEffect(() => onSnapshot(collection(db, 'users'), snapshot => {
        let searchDocuments: {}[] = []
        snapshot.docs.map(doc => {
            searchDocuments.push({
                id: doc.id,
                ...doc.data()
            })
        })
        if(searchDocuments.length > 0) {
            searchClient.collections('users').documents().import(searchDocuments, {action: 'upsert'})
        }
    }),[])

    // auto search no query changes
    useEffect(() => {
        if(query) {
            setLoading(true)
            searchClient.collections('users').documents().search({
                'q': query,
                'query_by'  : 'name',
            }).then(result => {
                setSearchResults(result.hits)
                setLoading(false)
            })
        }
    }, [query])

    return (
        <>
            <div className={`${onSearchPage && 'sticky top-16 py-6 flex items-center bg-white z-20'} ${active && 'border-b'}`}>
                <div className={classNames(
                    'absolute flex pl-3 items-center pointer-events-none h-[35px]', 
                    !onSearchPage && 'inset-y-0'
                )}>
                    <TbSearch className="w-5 h-5 text-gray-500"/>
                </div>
                <input
                    className={classNames(
                        'block w-full h-[35px] bg-[#e8eaed] border-0 focus:ring-0 focus:outline-0 pl-10 pr-5',
                        onSearchPage && 'rounded-md'
                    )}
                    arai-label="Search"
                    defaultValue={query}
                    placeholder="Search"
                    onChange={(event) => setQuery(event.target.value)}
                    onFocus={() => setActive(true)}
                    onBlur={(e) => {
                        if(!ref.current.contains(e.relatedTarget) && !isMb) setActive(false)
                    }}
                />
            </div>
            {
                active && (
                    <div className={classNames(
                        'min-h-[100px] md:max-h-[350px] overflow-y-auto useScrollbar w-full flex bg-white flex-col py-4'
                        )}
                        ref={ref}>
                        {
                            loading ? (
                                <div className="flex justify-center items-center"><ContentLoader/></div>
                            ):(
                                query && searchResults && searchResults?.length > 0 ? (
                                    searchResults.map(result => (
                                        <Link key={result.document.id} onClick={() => setActive(false)} 
                                            href={`/${result.document.username}`} className="flex items-center px-5 py-4 hover:bg-gray-100">
                                            <div className="relative h-12 w-12 rounded-full overflow-hidden mr-3">
                                                <img src={result.document.image} className="absolute inset-0 object-cover" alt="" />
                                            </div>
                                            <div className="flex flex-col justify-center">
                                                <p className="font-bold">{result.document.username}</p>
                                                <p className="font-[500] text-gray-500">{result.document.name}</p>
                                            </div>
                                        </Link>
                                    ))
                                ):(
                                    query && query.trim().length > 0 ? (
                                        <div className="py-12 text-center font-[500] text-gray-500">
                                            <p>Nothing Found for <span className="font-bold text-black">{query}</span></p>
                                        </div>
                                    ):(
                                        <div className="py-12 text-center font-[500] text-gray-500"><p>Start searching...</p></div>
                                    )
                                )
                            )
                        }
                    </div>
                )
            }
        </>
    )
}

export default InstantSearch