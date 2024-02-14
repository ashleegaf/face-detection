'use client';

import { useState } from 'react';
import { useImageProcessor } from '@/app/contextProvider';
import FileInput from '@/components/form/FileInput';
import AnnotatedFigure from '@/components/ui/AnnotatedFigure';
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
        setProcessedImage(URL.createObjectURL(image));
    };

    return (
        <div className='overflow-y-auto'>
            <div className='flex flex-col items-center gap-y-6 bg-indigo-100 overflow-y-auto pt-5 w-60 h-screen max-h-screen'>
                {isLoadingModel ? (
                    <Loader loading={isLoadingModel} text={'Loading AI models...'} />
                ) : (
                    <>
                        <FileInput handleChange={handleChange} />
                        <div>
                            {thumbnails.map((thumbnail) => (
                                <AnnotatedFigure
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
