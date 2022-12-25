type Props = {
    discard: Function
    cancel: Function
}

const PostDiscardAlert = ({ discard, cancel }: Props) => {
  return (
    <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center p-3 md:p-10 bg-black/70 z-10">
        <div className="text-center bg-white rounded-xl w-full sm:w-[500px]">
            <div className="py-8">
                <h2 className="text-xl font-bold">Discard Post?</h2>
                <p className="mt-5 font-[400] text-gray-500">If you leave, your edits won't be saved.</p>
            </div>
            <div className="mt-2 flex flex-col">
                <button 
                    onClick={() => discard()}
                    className="py-4 border-t border-solid border-gray-200 text-red-500 text-lg font-bold"
                    >Discard</button>
                <button 
                    onClick={() => cancel()}
                    className="py-4 border-t border-solid border-gray-200 text-lg"
                    >Cancel</button>
            </div>
        </div>
    </div>
  )
}

export default PostDiscardAlert