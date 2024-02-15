'use client';

import { createContext, useContext, useState } from 'react';
import { ReadOnlyPropsType } from '@/app/layout';

type ProcessedImageType = { src: string; name: string };
type ThumbnailType = { image: File; numberOfFaces: number | null };

interface ImageProcessorContextProps {
    processedImage: ProcessedImageType;
    setProcessedImage: React.Dispatch<ImageProcessorContextProps['processedImage']>;
    thumbnails: ThumbnailType[];
    setThumbnails: React.Dispatch<React.SetStateAction<ImageProcessorContextProps['thumbnails']>>;
}

export const ImageProcessorContext = createContext<ImageProcessorContextProps>({
    processedImage: { src: '', name: '' },
    setProcessedImage: (value: { src: string; name: string }) => void {},
    thumbnails: [],
    setThumbnails: (value: ((prevState: ThumbnailType[]) => ThumbnailType[]) | ThumbnailType[]) =>
        void {},
});

export const ImageProcessorProvider: React.FC<ReadOnlyPropsType> = ({ children }) => {
    const [processedImage, setProcessedImage] = useState<ProcessedImageType>({
        src: '',
        name: '',
    });
    const [thumbnails, setThumbnails] = useState<ThumbnailType[]>([]);

    return (
        <ImageProcessorContext.Provider
            value={{ processedImage, setProcessedImage, thumbnails, setThumbnails }}
        >
            {children}
        </ImageProcessorContext.Provider>
    );
};

export const useImageProcessor = () => {
    return useContext(ImageProcessorContext);
};
