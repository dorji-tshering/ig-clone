
/**
 * Right side component of the desktop '/direct/*' route
 * @returns 
 */
const Right = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="basis-full md:basis-3/5 md:overflow-y-auto relative flex flex-col">
            {/* content specific to a page */}
            {children}
        </div>
    )
}

export default Right