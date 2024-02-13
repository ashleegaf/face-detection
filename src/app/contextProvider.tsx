'use client';

import { createContext, useContext, useState } from 'react';
import { ReadOnlyPropsType } from '@/app/layout';

interface IImageProcessorProvider {
    processedImage: string;
    setProcessedImage: React.Dispatch<IImageProcessorProvider['processedImage']>;
}

export const ImageProcessorContext = createContext<IImageProcessorProvider>({
    processedImage: '',
    setProcessedImage: (value: string) => void {},
});

export const ImageProcessorProvider: React.FC<ReadOnlyPropsType> = ({ children }) => {
    const [processedImage, setProcessedImage] = useState<string>('');
    return (
        <ImageProcessorContext.Provider value={{ processedImage, setProcessedImage }}>
            {children}
        </ImageProcessorContext.Provider>
    );
};

export const useImageProcessor = () => {
    return useContext(ImageProcessorContext);
};
