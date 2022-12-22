import { Combobox } from "@headlessui/react"
import Link from "next/link";
import classNames from 'classnames';
import { useEffect, useRef, useState } from "react";
import { TbSearch } from 'react-icons/tb';
import { useRouter } from 'next/router';
import isMobile from '../utils/useMediaQuery';

/**
 * Search component
 */
const InstantSearch = ({onSearchPage = false}: {onSearchPage?: boolean}) => {
    const [active, setActive] = useState(false);
    const [query, setQuery] = useState<string>('');
    const [searchResults, setSearchResults] = useState(false);
    const ref = useRef<any>(null)
    const isMb = isMobile();

    const router = useRouter();

    useEffect(() => {
        const autoComplete = async (query: string) => {
            // search api code
        }
        autoComplete(query)
    }, [query])

    return (
        <>
            <div className={`${onSearchPage && 'sticky top-16 py-6 flex items-center bg-white z-20 border-b -mt-5'}`}>
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
                        'bg-white min-h-[100px] md:max-h-[350px] overflow-y-auto useScrollbar w-full flex flex-col py-4'
                        )}
                        ref={ref}>
                        {
                            searchResults ? (
                                <>
                                    <Link onClick={() => setActive(false)} href="/post/sdf" className="flex items-center px-5 py-4 hover:bg-gray-100">
            <div className="relative h-12 w-12 rounded-full overflow-hidden mr-3">
                <img src="/images/dorji.jpg" className="absolute inset-0 object-cover" alt="" />
            </div>
            <div className="flex flex-col justify-center">
                <p className="font-bold">dorji_dev</p>
                <p className="font-[500] text-gray-500">Dorji Tshering</p>
            </div>
                                    </Link>
                                    <Link onClick={() => setActive(false)}  href="/post/sadfasf" className="flex items-center px-5 py-4 hover:bg-gray-100">
                                        <div className="relative h-12 w-12 rounded-full overflow-hidden mr-3">
                                            <img src="/images/dorji.jpg" className="absolute inset-0 object-cover" alt="" />
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <p className="font-bold">dorji_dev</p>
                                            <p className="font-[500] text-gray-500">Dorji Tshering</p>
                                        </div>
                                    </Link>
                                    <Link onClick={() => setActive(false)} href="/" className="flex items-center px-5 py-4 hover:bg-gray-100">
                                        <div className="relative h-12 w-12 rounded-full overflow-hidden mr-3">
                                            <img src="/images/dorji.jpg" className="absolute inset-0 object-cover" alt="" />
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <p className="font-bold">dorji_dev</p>
                                            <p className="font-[500] text-gray-500">Dorji Tshering</p>
                                        </div>
                                    </Link>
                                    <Link onClick={() => setActive(false)} href="/" className="flex items-center px-5 py-4 hover:bg-gray-100">
                                        <div className="relative h-12 w-12 rounded-full overflow-hidden mr-3">
                                            <img src="/images/dorji.jpg" className="absolute inset-0 object-cover" alt="" />
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <p className="font-bold">dorji_dev</p>
                                            <p className="font-[500] text-gray-500">Dorji Tshering</p>
                                        </div>
                                    </Link>
                                    <Link onClick={() => setActive(false)} href="/" className="flex items-center px-5 py-4 hover:bg-gray-100">
                                        <div className="relative h-12 w-12 rounded-full overflow-hidden mr-3">
                                            <img src="/images/dorji.jpg" className="absolute inset-0 object-cover" alt="" />
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <p className="font-bold">dorji_dev</p>
                                            <p className="font-[500] text-gray-500">Dorji Tshering</p>
                                        </div>
                                    </Link>
                                </>
                            ):(
                                query && query.trim().length > 0 ? (
                                    <div className="py-12 text-center font-[500] text-gray-500">
                                        <p>Nothing Found for <span className="font-bold text-black">{query}</span></p>
                                    </div>
                                ):(
                                    <div className="py-12 text-center font-[500] text-gray-500"><p>Start searching...</p></div>
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