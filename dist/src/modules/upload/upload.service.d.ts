import { ConfigService } from '@nestjs/config';
export declare class UploadService {
    private configService;
    private readonly logger;
    private readonly uploadDir;
    constructor(configService: ConfigService);
    saveFile(file: any): Promise<{
        fileName: string;
        fileUrl: string;
        fileType: string;
        fileSize: number;
    }>;
    saveFiles(files: any[]): Promise<Array<{
        fileName: string;
        fileUrl: string;
        fileType: string;
        fileSize: number;
    }>>;
    deleteFile(fileUrl: string): Promise<void>;
}
