import { currentFeatures, toBeImplemented } from "../../utils/features"

const Features = () => {
    return (
        <div className="bg-white mb-20 sm:shadow-mainShadow h-full sm:h-auto sm:rounded-lg 
            sm:mt-5 sm:max-w-[400px] md:max-w-[500px] sm:mx-auto p-10">
            <div className="mb-7">
                <h1 className="text-xl font-bold mb-2">Detailed Outline Of Features</h1>
                <p className="text-gray-400 text-sm">Updated: 23/12/2022</p>
            </div>
            <section className="mb-7">
                <h2 className="text-lg text-gray-600 font-bold mb-3">Current Features</h2>
                <ul className="text-[#334155]">
                    {
                        currentFeatures.map((feature, idx) => (
                            <li key={idx} className="pl-4 relative before:content-[''] before:h-[5px] before:w-[5px] before:bg-gray-500
                                before:inline-block before:rounded-full before:absolute
                                before:top-[10px] before:left-0 leading-7">
                                {feature}
                            </li>
                        ))
                    }
                </ul>
            </section>
            <section>
                <h2 className="text-xl text-gray-600 font-bold mb-3">To Be Implemented</h2>
                <ul className="text-[#334155]">
                    {
                        toBeImplemented.map((feature, idx) => (
                            <li key={idx} className="pl-4 relative before:content-[''] before:h-[5px] before:w-[5px] before:bg-gray-500
                                before:inline-block before:rounded-full before:absolute
                                before:top-[10px] before:left-0 leading-7">
                                {feature}
                            </li>
                        ))
                    }
                </ul>
            </section>
        </div>
    )
}

export default Features