'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useImageProcessor } from '@/app/contextProvider';
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
        if (processedImage.src) {
            (async function () {
                setIsLoadingDetection(true);

                const canvas = canvasRef.current?.getContext('2d');
                canvas?.reset();

                const numberOfFaces = await faceDetectionService.detectFaces(
                    processedImage.name,
                    imageRef,
                    canvasRef,
                );
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
        <div className='flex min-h-screen'>
            <Sidebar isLoadingModel={isLoadingModel} isLoadingDetection={isLoadingDetection} />
            <main className='flex flex-1 flex-col items-center gap-5 overflow-y-hidden bg-slate-50 p-10'>
                <header>
                    <h1 className='text-lg font-bold'>AI Face Detection Processor</h1>
                </header>
                {processedImage.src && (
                    <div className='relative flex h-96 w-96 items-center justify-center'>
                        <Image
                            ref={imageRef}
                            src={processedImage.src}
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
            </main>
        </div>
    );
};

export default Home;
