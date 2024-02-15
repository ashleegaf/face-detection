'use client';

import { createContext, useContext, useState } from 'react';
import { ReadOnlyPropsType } from '@/app/layout';

interface ImageProcessorContextProps {
    processedImage: { src: string, name: string };
    setProcessedImage: React.Dispatch<ImageProcessorContextProps['processedImage']>;
    thumbnails: { image: File; numberOfFaces: number | null }[];
    setThumbnails: React.Dispatch<React.SetStateAction<ImageProcessorContextProps['thumbnails']>>;
}

export const ImageProcessorContext = createContext<ImageProcessorContextProps>({
    processedImage: { src: '', name: '' },
    setProcessedImage: (value: { src: string, name: string }) => void {},
    thumbnails: [],
    setThumbnails: (
        value:
            | ((
                  prevState: { image: File; numberOfFaces: number | null }[],
              ) => { image: File; numberOfFaces: number | null }[])
            | { image: File; numberOfFaces: number | null }[],
    ) => void {},
});

export const ImageProcessorProvider: React.FC<ReadOnlyPropsType> = ({ children }) => {
    const [processedImage, setProcessedImage] = useState<{ src: string, name: string }>({ src: '', name: '' });
    const [thumbnails, setThumbnails] = useState<{ image: File; numberOfFaces: number | null }[]>(
        [],
    );

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
