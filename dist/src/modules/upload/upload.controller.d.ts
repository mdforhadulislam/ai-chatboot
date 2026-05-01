import { StreamableFile } from '@nestjs/common';
import { UploadService } from './upload.service';
import { Response } from 'express';
export declare class UploadController {
    private uploadService;
    constructor(uploadService: UploadService);
    uploadFile(file: any): Promise<{
        fileName: string;
        fileUrl: string;
        fileType: string;
        fileSize: number;
    }>;
    uploadMultipleFiles(files: any[]): Promise<{
        fileName: string;
        fileUrl: string;
        fileType: string;
        fileSize: number;
    }[]>;
    getFile(fileUrl: string, res: Response): Promise<StreamableFile>;
}
