'use client';

import { useImageProcessor } from '@/app/contextProvider';

interface IAnnotatedFigure {
    image: File;
    isLoading?: boolean;
}

const AnnotatedFigure: React.FC<IAnnotatedFigure> = ({ image, isLoading = true }) => {
    const { setProcessedImage } = useImageProcessor();

    const handleClick = async (_event: React.MouseEvent<HTMLElement>) => {
        if (isLoading) {
            return;
        }
        setProcessedImage(URL.createObjectURL(image));
    };

    return (
        <figure
            className={`mb-5 bg-black relative ${isLoading ? 'cursor-default' : 'cursor-pointer'}`}
            onClick={handleClick}
        >
            <CanvasImage src={URL.createObjectURL(image)} width={100} height={100} />
            <figcaption className='absolute top-4 left-1/2 transform -translate-x-1/2 bg-white p-1'>
                {isLoading ? 'Processing...' : '1 face'}
            </figcaption>
        </figure>
    );
};

export default AnnotatedFigure;
