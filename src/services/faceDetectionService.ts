import {
    detectAllFaces,
    draw,
    loadFaceLandmarkModel,
    loadFaceRecognitionModel,
    loadSsdMobilenetv1Model,
    matchDimensions,
    resizeResults,
} from 'face-api.js';

const MODEL_URL = '/models';

class FaceDetectionService {
    private static instance: FaceDetectionService;

    private constructor() {}

    public static getInstance(): FaceDetectionService {
        if (!FaceDetectionService.instance) {
            FaceDetectionService.instance = new FaceDetectionService();
        }
        return FaceDetectionService.instance;
    }

    public async loadModels(): Promise<void> {
        await loadSsdMobilenetv1Model(MODEL_URL);
        await loadFaceLandmarkModel(MODEL_URL);
        await loadFaceRecognitionModel(MODEL_URL);
    }

    public async detectFaces(
        imageRef: React.MutableRefObject<HTMLImageElement | null>,
        canvasRef: React.MutableRefObject<HTMLCanvasElement | null>,
    ): Promise<number | void> {
        if (!imageRef.current || !canvasRef.current) {
            return;
        }

        try {
            const fullFaceDescriptions = await detectAllFaces(imageRef.current)
                .withFaceLandmarks()
                .withFaceDescriptors();
            const { width, height } = matchDimensions(canvasRef.current, imageRef.current);
            const resizedFaceDescriptions = resizeResults(fullFaceDescriptions, {
                width,
                height,
            });
            draw.drawDetections(canvasRef.current, resizedFaceDescriptions);
            return resizedFaceDescriptions.length;
        } catch (error) {
            console.error(`Error detecting faces:`, error);
        }
    }
}

export const faceDetectionService = FaceDetectionService.getInstance();
