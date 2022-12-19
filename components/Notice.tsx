import { noticeState } from '../atoms/noticeAtom'
import { motion, AnimatePresence } from 'framer-motion'
import { useRecoilState } from 'recoil'
import { IoMdClose } from 'react-icons/io'

const Notice = () => {
    const [notice, setNotice] = useRecoilState(noticeState)

    return (
        <>
            <AnimatePresence>
                {
                    notice.show && (
                        <motion.div 
                            initial={{y: -100}}
                            animate={{y: 0}}
                            exit={{y: -100}}
                            transition={{
                                y: {type: 'spring', stiffness: 300, damping: 30, duration: 2 }
                            }}
                            className={`bg-gray-900 fixed top-2 z-[100] right-0 
                            left-0 mx-auto w-fit text-gray-200 flex rounded-md max-w-[300px] overflow-hidden`}>
                            <p className='px-5 py-3'>{notice.message}</p>
                            <button onClick={() => setNotice({
                                show: false, 
                                message: '',
                            })}
                                className="flex items-center px-5 hover:bg-gray-800 transition-all duration-500"><IoMdClose size={18}/></button>
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </>
    )
}

export default Notice