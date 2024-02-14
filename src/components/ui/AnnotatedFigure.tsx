'use client';

import Image from 'next/image';
import { useImageProcessor } from '@/app/contextProvider';

interface AnnotatedFigureProps {
    image: File;
    isLoading?: boolean;
}

const AnnotatedFigure: React.FC<AnnotatedFigureProps> = ({ image, isLoading = true }) => {
    const { setProcessedImage } = useImageProcessor();

    const handleClick = async (_event: React.MouseEvent<HTMLElement>) => {
        if (isLoading) {
            return;
        }
        setProcessedImage(URL.createObjectURL(image));
    };

    return (
        <figure
            className={`mb-5 relative h-24 w-24 ${isLoading ? 'cursor-default' : 'cursor-pointer'}`}
            onClick={handleClick}
        >
            <Image
                src={URL.createObjectURL(image)}
                alt='Original image'
                fill
                className='absolute max-h-full'
            />
            <figcaption className='absolute top-4 left-1/2 transform -translate-x-1/2 bg-white p-1'>
                {isLoading ? 'Processing...' : '1 face'}
            </figcaption>
        </figure>
    );
};

export default AnnotatedFigure;
