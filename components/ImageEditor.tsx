import { Alert, Modal } from 'flowbite-react';
import dynamic from 'next/dynamic';
import { Dispatch, SetStateAction, useState } from 'react';
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
}

const ImageEditor = ({ 
        setFileSelectOpen, 
        setEditorOpen, 
        setCaptionModalOpen, 
        selectedFile, 
        setEditedFile, 
        editedFile,
        setSelectedFile }: Props) => {
    const [alertChanges, setAlertChanges] = useState(false);

    const saveEditedImage = (editedImage: any) => {
        setEditedFile(editedImage.imageBase64);
    }

    const onNext = () => {
        setEditorOpen(false); 
        setCaptionModalOpen(true);
    }

    const onBack = () => {
        if(editedFile) {
            setAlertChanges(true);
        } else {
            setEditorOpen(false); 
            setFileSelectOpen(true);
            setSelectedFile(null);
        }
    }

    return (
        <>  
            { alertChanges &&  (
                <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center p-3 md:p-10 bg-black/30 z-10">
                    <Alert color='warning' rounded={true} className="text-center">
                        <h2 className="text-xl font-bold">Discard Post?</h2>
                        <p className="mt-5">If you leave, your edits won't be saved.</p>
                        <div className="mt-7">
                            <button 
                                onClick={() => {setEditorOpen(false); setFileSelectOpen(true); setEditedFile(null); setSelectedFile(null)}}
                                className="py-2 px-5 mr-3 rounded-md text-white bg-yellow-700 border border-solid border-yellow-700"
                                >Discard</button>
                            <button 
                                onClick={() => setAlertChanges(false)}
                                className="py-2 px-5 rounded-md border border-yellow-700 border-solid"
                                >Cancel</button>
                        </div>
                    </Alert>
                </div>
            )}
            <Modal.Header>Edit</Modal.Header>
            <Modal.Body className="imageEditor">
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
                <p className="mt-6 text-center text-sm text-gray-500 font-[500]">Save image before proceeding</p>
            </Modal.Body>
            <Modal.Footer className="justify-center">            
                <button 
                    onClick={() => onBack()}
                    className="py-2 px-5 mr-5 rounded-md bg-gray-100 font-bold">
                        Back
                </button>
                {
                    editedFile && (
                        <button className="rounded-md py-2 px-5 !ml-5 text-white bg-instaBlue font-bold" onClick={() => onNext()}>Next</button>
                    )
                }
            </Modal.Footer>
        </>
    )
}

export default ImageEditor