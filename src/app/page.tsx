'use client';

import { useImageProcessor } from '@/app/contextProvider';
import CanvasImage from '@/components/ui/CanvasImage';
import Sidebar from '@/components/ui/Sidebar';

const Home = () => {
    const { processedImage } = useImageProcessor();

    return (
        <div className='min-h-screen flex'>
            <Sidebar />
            <main className='flex flex-col flex-1 items-center p-10 bg-emerald-200 overflow-y-hidden'>
                <header>
                    <h1>AI Face Detection Processor</h1>
                </header>
                {processedImage && <CanvasImage src={processedImage} width={400} height={400} />}
            </main>
        </div>
    );
};

export default Home;
