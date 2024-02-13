'use client';

import { useRef, useEffect } from 'react';

interface ICanvasImage {
    src: string;
    width: number;
    height: number;
}

const CanvasImage: React.FC<ICanvasImage> = ({ src, width, height }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (!context) {
            return;
        }

        const image = new Image(width, height);
        image.onload = () => {
            // Calculate new dimensions while maintaining the original aspect ratio
            const aspectRatio = image.width / image.height;
            let newWidth = width;
            let newHeight = height;

            if (newWidth / aspectRatio > newHeight) {
                newWidth = newHeight * aspectRatio;
            } else {
                newHeight = newWidth / aspectRatio;
            }

            // Set canvas dimensions
            canvas.width = width;
            canvas.height = height;

            // Draw the image on the canvas with the specified width and height
            context.drawImage(image, 0, 0, newWidth, newHeight);
        };
        image.src = src;
    }, [src, width, height]);

    return <canvas ref={canvasRef} />;
};

export default CanvasImage;
