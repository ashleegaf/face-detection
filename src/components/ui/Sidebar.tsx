'use client';

import { useState } from 'react';
import { useImageProcessor } from '@/app/contextProvider';
import FileInput from '@/components/form/FileInput';
import AnnotatedThumbnail from '@/components/ui/AnnotatedThumbnail';
import Loader from '@/components/ui/Loader';

interface SidebarProps {
    isLoadingModel: boolean;
    isLoadingDetection: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isLoadingModel, isLoadingDetection }) => {
    const { setProcessedImage, thumbnails, setThumbnails } = useImageProcessor();

    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) {
            return;
        }

        const image = event.target.files[0];
        setThumbnails((prev) => [{ image, numberOfFaces: null }, ...prev]);
        setProcessedImage({ src: URL.createObjectURL(image), name: image.name });
    };

    return (
        <div className='overflow-y-auto'>
            <div className='flex flex-col items-center gap-y-6 bg-indigo-100 overflow-y-auto pt-5 w-60 h-screen max-h-screen'>
                {isLoadingModel ? (
                    <Loader loading={isLoadingModel} text={'Loading AI models...'} />
                ) : (
                    <>
                        <FileInput handleChange={handleChange} isDisabled={isLoadingDetection} />
                        <div>
                            {thumbnails.map((thumbnail) => (
                                <AnnotatedThumbnail
                                    key={thumbnail.image.name}
                                    image={thumbnail.image}
                                    isLoading={isLoadingDetection}
                                    numberOfFaces={thumbnail.numberOfFaces}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
