import { Alert, Modal } from 'flowbite-react';
import dynamic from 'next/dynamic';
import { Dispatch, SetStateAction, useState } from 'react';
import { MdOutlineArrowBack } from 'react-icons/md';
import PostDiscardAlert from './PostDiscardAlert';

const FilerobotImageEditor = dynamic(() => import('react-filerobot-image-editor'), {ssr: false});
const TABS = dynamic(() => import('react-filerobot-image-editor').then(module => module.TABS as any), {ssr: false}) as any;
const TOOLS = dynamic(() => import('react-filerobot-image-editor').then(module => module.TOOLS as any), {ssr: false}) as any;

type Props = {
    setFileSelectOpen: Dispatch<SetStateAction<boolean>>;
    setEditorOpen: Dispatch<SetStateAction<boolean>>;
    setCaptionModalOpen: Dispatch<SetStateAction<any>>;
    selectedFile: any;
    setEditedFile: Dispatch<SetStateAction<any>>;
    editedFile: any;
    setSelectedFile: Dispatch<SetStateAction<any>>;
    editorOpen: boolean
    captionModalOpen: boolean
}

const ImageEditor = ({ 
        setFileSelectOpen, 
        setEditorOpen, 
        setCaptionModalOpen, 
        selectedFile, 
        setEditedFile, 
        editedFile,
        setSelectedFile,
        editorOpen, 
        captionModalOpen }: Props) => {
    const [alertChanges, setAlertChanges] = useState(false);

    const saveEditedImage = (editedImage: any) => {
        setEditedFile(editedImage.imageBase64);
    }

    const onNext = () => {
        setEditorOpen(false); 
        setCaptionModalOpen(true);
    }

    const onBack = () => {
        if(editedFile || selectedFile) {
            setAlertChanges(true);
        } else {
            setEditorOpen(false); 
            setFileSelectOpen(true);
            setSelectedFile(null);
        }
    }

    const discard = () => {
        selectedFile && setSelectedFile(null);
        editedFile && setEditedFile(null);
        editorOpen && setEditorOpen(false);
        captionModalOpen && setCaptionModalOpen(false);
        setFileSelectOpen(true);
        setAlertChanges(false);
    }

    const cancel = () => {
        setAlertChanges(false);
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
            <div className="imageEditor">
                <FilerobotImageEditor 
                    source={editedFile ?? selectedFile}
                    onSave={(editedImageObject: any) => {    
                        saveEditedImage(editedImageObject)
                    }}
                    
                    Text={{ text: 'Filerobot...' }}
                    Rotate={{ angle: 90, componentType: 'slider' }}
                    Crop={{
                        presetsItems: [
                        {
                            titleKey: 'classicTv',
                            descriptionKey: '4:3',
                            ratio: (4 / 3).toString(),
                            // icon: CropClassicTv, // optional, CropClassicTv is a React Function component. Possible (React Function component, string or HTML Element)
                        },
                        {
                            titleKey: 'cinemascope',
                            descriptionKey: '21:9',
                            ratio: (21 / 9).toString(),
                            // icon: CropCinemaScope, // optional, CropCinemaScope is a React Function component.  Possible (React Function component, string or HTML Element)
                        },
                        ],
                        presetsFolders: [
                            {
                                titleKey: 'socialMedia', // will be translated into Social Media as backend contains this translation key
                                // icon: Social, // optional, Social is a React Function component. Possible (React Function component, string or HTML Element)
                                groups: [
                                    {
                                        titleKey: 'facebook',
                                        items: [
                                            {
                                                titleKey: 'profile',
                                                width: 180,
                                                height: 180,
                                                descriptionKey: 'fbProfileSize',
                                            },
                                            {
                                            titleKey: 'coverPhoto',
                                            width: 820,
                                            height: 312,
                                            descriptionKey: 'fbCoverPhotoSize',
                                        },
                                        ],
                                    },
                                ],
                            },
                        ],
                    }}
                    tabsIds={[TABS.ADJUST,TABS.FILTERS, TABS.FINETUNE, TABS.RESIZE]}
                    defaultTabId={TABS.ADJUST}
                    defaultToolId={TOOLS.TEXT}
                    savingPixelRatio={4}
                    previewPixelRatio={window.devicePixelRatio}
                />
                <p className="my-6 text-center text-sm text-gray-500 font-[500]">Save image after changes</p>
            </div>
        </div>
    )
}

export default ImageEditor