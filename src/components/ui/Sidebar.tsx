'use client';

import { useState } from 'react';
import { useImageProcessor } from '@/app/contextProvider';
import FileInput from '@/components/form/FileInput';
import AnnotatedThumbnail from '@/components/ui/AnnotatedThumbnail';
import Loader from '@/components/ui/Loader';

interface SidebarProps {
    isLoadingModel: boolean;
    isLoadingDetection: boolean;
    isErrorModel: boolean;
    setIsLoadingDetection: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({
    isLoadingModel,
    isLoadingDetection,
    isErrorModel,
    setIsLoadingDetection,
}) => {
    const { setProcessedImage, thumbnails, setThumbnails } = useImageProcessor();
    const [isDuplicate, setIsDuplicate] = useState<boolean>(false);

    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || !event.target.files.length) {
            return;
        }

        const image = event.target.files[0];
        const existingImage = thumbnails.some((thumbnail) => thumbnail.image.name === image.name);
        if (existingImage) {
            setIsDuplicate(true);
            return;
        }

        setIsLoadingDetection(true);
        setIsDuplicate(false);
        setThumbnails((prev) => [{ image, numberOfFaces: null }, ...prev]);
        setProcessedImage({ src: URL.createObjectURL(image), name: image.name });
    };

    let content: React.ReactNode;

    if (isLoadingModel) {
        content = <Loader loading={isLoadingModel} text={'Loading AI models...'} />;
    } else if (isErrorModel) {
        content = (
            <p className='px-2 text-center'>
                Error loading models. Validate model url and refresh page.
            </p>
        );
    } else {
        content = (
            <>
                <div className='min-h-16 w-full text-center'>
                    <FileInput handleChange={handleChange} isDisabled={isLoadingDetection} />
                    {isDuplicate && (
                        <p className='mt-1 text-xs font-bold text-red-500'>
                            Duplicate image. Try again.
                        </p>
                    )}
                </div>
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
        );
    }

    return (
        <div className='overflow-y-auto'>
            <div className='flex h-screen max-h-screen w-60 flex-col items-center gap-y-6 overflow-y-auto bg-indigo-100 pt-5'>
                {content}
            </div>
        </div>
    );
};

export default Sidebar;
