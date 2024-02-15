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

interface DetectionResult {
    numberOfFaces: number;
    resizedFaceDescriptions: draw.TDrawDetectionsInput | draw.TDrawDetectionsInput[];
}

class FaceDetectionService {
    private static instance: FaceDetectionService;
    private detectionResultsCache: Map<string, DetectionResult> = new Map();

    private constructor() {}

    public static getInstance(): FaceDetectionService {
        if (!FaceDetectionService.instance) {
            FaceDetectionService.instance = new FaceDetectionService();
        }
        return FaceDetectionService.instance;
    }

    public async loadModels(): Promise<void | Error> {
        try {
            await loadSsdMobilenetv1Model(MODEL_URL);
            await loadFaceLandmarkModel(MODEL_URL);
            await loadFaceRecognitionModel(MODEL_URL);
        } catch (error: any) {
            console.error(`Error loading models. Validate model url.`, error);
            return error;
        }
    }

    public async detectFaces(
        name: string,
        imageRef: React.MutableRefObject<HTMLImageElement | null>,
        canvasRef: React.MutableRefObject<HTMLCanvasElement | null>,
    ): Promise<number | void> {
        if (!name || !imageRef.current || !canvasRef.current) {
            return;
        }

        try {
            const existingDetection = this.detectionResultsCache.get(name);
            if (existingDetection) {
                const { resizedFaceDescriptions } = existingDetection;
                draw.drawDetections(canvasRef.current, resizedFaceDescriptions);
                return;
            }

            const fullFaceDescriptions = await detectAllFaces(imageRef.current)
                .withFaceLandmarks()
                .withFaceDescriptors();
            const { width, height } = matchDimensions(canvasRef.current, imageRef.current);
            const resizedFaceDescriptions = resizeResults(fullFaceDescriptions, {
                width,
                height,
            });

            const newDetectionResults: DetectionResult = {
                numberOfFaces: resizedFaceDescriptions.length,
                resizedFaceDescriptions,
            };
            this.detectionResultsCache.set(name, newDetectionResults);

            draw.drawDetections(canvasRef.current, resizedFaceDescriptions);

            return resizedFaceDescriptions.length;
        } catch (error) {
            console.error(`Error detecting faces:`, error);
        }
    }
}

export const faceDetectionService = FaceDetectionService.getInstance();
