'use client';

import { createContext, useContext, useState } from 'react';
import { ReadOnlyPropsType } from '@/app/layout';

interface ImageProcessorContextProps {
    processedImage: string;
    setProcessedImage: React.Dispatch<ImageProcessorContextProps['processedImage']>;
    thumbnails: { image: File; numberOfFaces: number | null }[];
    setThumbnails: React.Dispatch<React.SetStateAction<ImageProcessorContextProps['thumbnails']>>;
}

export const ImageProcessorContext = createContext<ImageProcessorContextProps>({
    processedImage: '',
    setProcessedImage: (value: string) => void {},
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
    const [processedImage, setProcessedImage] = useState<string>('');
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
