'use client';

import { useState } from 'react';
import { useImageProcessor } from '@/app/contextProvider';
import FileInput from '@/components/form/FileInput';
import AnnotatedFigure from '@/components/ui/AnnotatedFigure';

const Sidebar = () => {
    const { processedImage, setProcessedImage } = useImageProcessor();
    const [thumbnails, setThumbnails] = useState<React.ReactNode[]>([]);

    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) {
            return;
        }

        const image = event.target.files[0];
        setThumbnails((prev) => [<AnnotatedFigure image={image} key={image.name} />, ...prev]);
        setProcessedImage(URL.createObjectURL(image));
    };

    return (
        <div className='overflow-y-auto'>
            <div className='flex flex-col items-center gap-y-6 bg-gray-100 overflow-y-auto pt-5 w-60 h-screen max-h-screen'>
                <FileInput handleChange={handleChange} />
                <div>{thumbnails}</div>
            </div>
        </div>
    );
};

export default Sidebar;
