'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useImageProcessor } from '@/app/contextProvider';
import Sidebar from '@/components/ui/Sidebar';
import { faceDetectionService } from '@/services/faceDetectionService';

const THUMBNAIL_SIZE = 384; // Corresponds to tailwind CSS container size

const Home = () => {
    const { processedImage } = useImageProcessor();
    const [isLoadingModel, setIsLoadingModel] = useState<boolean>(false);
    const [isLoadingDetection, setIsLoadingDetection] = useState<boolean>(false);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const imageRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        (async function () {
            setIsLoadingModel(true);
            await faceDetectionService.loadModels();
            setIsLoadingModel(false);
        })();
    }, []);

    useEffect(() => {
        if (processedImage) {
            (async function () {
                setIsLoadingDetection(true);
                await faceDetectionService.detectFaces(imageRef, canvasRef);
                setIsLoadingDetection(false);
            })();
        }
    }, [processedImage]);

    return (
        <div className='min-h-screen flex'>
            <Sidebar />
            <main className='flex flex-col flex-1 items-center p-10 bg-emerald-200 overflow-y-hidden'>
                <header>
                    <h1>AI Face Detection Processor</h1>
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
                {isLoadingModel && <p>Loading Model...</p>}
            </main>
        </div>
    );
};

export default Home;
