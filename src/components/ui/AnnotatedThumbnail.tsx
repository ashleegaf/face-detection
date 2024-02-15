'use client';

import Image from 'next/image';
import { useImageProcessor } from '@/app/contextProvider';

interface AnnotatedThumbnailProps {
    image: File;
    isLoading: boolean;
    numberOfFaces: number | null;
}

const AnnotatedThumbnail: React.FC<AnnotatedThumbnailProps> = ({
    image,
    isLoading,
    numberOfFaces,
}) => {
    const { setProcessedImage } = useImageProcessor();

    const handleClick = async (_event: React.MouseEvent<HTMLElement>) => {
        if (isLoading) {
            return;
        }
        setProcessedImage({ src: URL.createObjectURL(image), name: image.name });
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
            <figcaption className='absolute top-4 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-white p-1'>
                {typeof numberOfFaces === 'number' ? `${numberOfFaces}+ face(s)` : 'Processing...'}
            </figcaption>
        </figure>
    );
};

export default AnnotatedThumbnail;