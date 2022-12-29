import { Dispatch, SetStateAction, useRef, useState } from 'react'
import { MdOutlineArrowBack } from 'react-icons/md'
import PostDiscardAlert from './PostDiscardAlert'

type Props = {
    setFileSelectOpen: Dispatch<SetStateAction<boolean>>
    setEditorOpen: Dispatch<SetStateAction<boolean>>
    setCaptionModalOpen: Dispatch<SetStateAction<any>>
    selectedFile: any
    setFilter: Dispatch<SetStateAction<string>>
    filter: string
    setSelectedFile: Dispatch<SetStateAction<any>>
    editorOpen: boolean
    captionModalOpen: boolean
}

const imageFilters = [
    '_1977', 'brannan', 'brooklyn', 'clarendon',
    'earlybird', 'gingham', 'hudson', 'inkwell', 'kelvin', 
    'lark', 'lofi', 'maven', 'mayfair', 'moon', 'nashville', 'perpetua',
    'reyes', 'rise', 'slumber', 'stinson', 'toaster', 'valencia',
    'walden', 'willow', 'xpro2'
]

const ImageEditor = ({ 
        setFileSelectOpen, 
        setEditorOpen, 
        setCaptionModalOpen, 
        selectedFile, 
        setFilter,
        filter,
        setSelectedFile,
        editorOpen, 
        captionModalOpen }: Props) => {
    const [alertChanges, setAlertChanges] = useState(false)
    const mainImageRef = useRef<HTMLImageElement | null>(null)

    const onNext = () => {
        setEditorOpen(false)
        setCaptionModalOpen(true)
    }

    const onBack = () => {
        if(filter || selectedFile) {
            setAlertChanges(true)
        } else {
            setEditorOpen(false)
            setFileSelectOpen(true)
            setSelectedFile(null)
        } 
    }

    const discard = () => {
        selectedFile && setSelectedFile(null)
        filter && setFilter('')
        editorOpen && setEditorOpen(false)
        captionModalOpen && setCaptionModalOpen(false)
        setFileSelectOpen(true)
        setAlertChanges(false)
    }

    const cancel = () => {
        setAlertChanges(false)
    }

    return (
        <div className="md:max-w-[800px]">  
            { alertChanges &&  (
                <PostDiscardAlert discard={discard} cancel={cancel}/>
            )}
            <header className="p-5 border-b border-solid border-b-gray-200 flex justify-between items-center">
                <button 
                    onClick={() => onBack()}>
                        <MdOutlineArrowBack size={24}/>
                </button>
                <h1 className="text-lg font-bold">Edit</h1>
                <button className="text-instaBlue font-bold pr-2" onClick={() => onNext()}>Next</button>
            </header>
            <div className="flex flex-col md:flex-row">
                <div className='md:basis-2/3 md:max-h-[550px] flex justify-center items-center'>
                    <figure ref={mainImageRef} className={`${filter}`}>
                            <img  src={selectedFile} 
                            className={`h-full max-h-[400px] md:max-h-[550px] object-contain`} 
                            alt="post image" />
                    </figure>
                </div>
                <div className='md:basis-1/3 my-5 md:my-0 md:h-auto mx-2 md:mx-0 md:mt-0 flex md:grid md:grid-cols-2 
                    md:max-h-[550px] md:overflow-y-auto overflow-x-auto scrollbar-none'>
                    <figure onClick={() => setFilter('')} className='min-w-[75px] sm:min-w-[90px] md:min-w-[auto]'>
                        <img src={selectedFile} className=' md:h-full object-cover' alt="original image" />
                    </figure>
                    {
                        imageFilters.map((filter, idx) => (
                            <figure key={idx} onClick={() => setFilter(filter)} 
                                className={filter + ' min-w-[75px] sm:min-w-[90px] md:min-w-[auto]'}>
                                <img src={selectedFile} className='md:h-full object-contain relative' alt={`filter ${filter}`} />
                            </figure>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default ImageEditor