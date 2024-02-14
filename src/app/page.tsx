'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useImageProcessor } from '@/app/contextProvider';
import Loader from '@/components/ui/Loader';
import Sidebar from '@/components/ui/Sidebar';
import { faceDetectionService } from '@/services/faceDetectionService';

const THUMBNAIL_SIZE = 384; // Corresponds to tailwind CSS container size

const Home = () => {
    const { processedImage, setThumbnails } = useImageProcessor();
    const [isLoadingModel, setIsLoadingModel] = useState<boolean>(true);
    const [isLoadingDetection, setIsLoadingDetection] = useState<boolean>(false);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const imageRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        (async function () {
            await faceDetectionService.loadModels();
            setIsLoadingModel(false);
        })();
    }, []);

    useEffect(() => {
        if (processedImage) {
            (async function () {
                setIsLoadingDetection(true);
                const numberOfFaces = await faceDetectionService.detectFaces(imageRef, canvasRef);
                if (typeof numberOfFaces === 'number') {
                    setThumbnails((prev) => {
                        const newThumbnails = [...prev];
                        newThumbnails[0].numberOfFaces = numberOfFaces;
                        return newThumbnails;
                    });
                }
                setIsLoadingDetection(false);
            })();
        }
    }, [processedImage, setThumbnails]);

    return (
        <div className='min-h-screen flex'>
            <Sidebar isLoadingModel={isLoadingModel} isLoadingDetection={isLoadingDetection} />
            <main className='flex flex-col flex-1 items-center gap-5 p-10 bg-slate-50 overflow-y-hidden'>
                <header>
                    <h1 className='font-bold text-lg'>AI Face Detection Processor</h1>
                </header>
                {processedImage && (
                    <div className='relative h-96 w-96 flex justify-center items-center'>
                        <Image
                            ref={imageRef}
                            src={processedImage}
                            alt='Original image'
                            fill
                            className='absolute max-h-full'
                        />
                        <canvas
                            ref={canvasRef}
                            width={THUMBNAIL_SIZE}
                            height={THUMBNAIL_SIZE}
                            className='absolute max-h-full'
                        />
                    </div>
                )}
                {isLoadingDetection && (
                    <Loader loading={isLoadingDetection} text={'Detecting faces...'} />
                )}
            </main>
        </div>
    );
};

export default Home;
