import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { promises as fs } from 'fs';
import { join, extname } from 'path';

@Injectable()
export class UploadService {
  private readonly logger = new Logger(UploadService.name);
  private readonly uploadDir: string;

  constructor(private configService: ConfigService) {
    this.uploadDir = this.configService.get<string>('UPLOAD_DIR') || 'uploads';
  }

  async saveFile(file: any): Promise<{ fileName: string; fileUrl: string; fileType: string; fileSize: number }> {
    const uniqueFileName = `${Date.now()}-${file.originalname}`;
    const filePath = join(process.cwd(), this.uploadDir, uniqueFileName);

    await fs.mkdir(join(process.cwd(), this.uploadDir), { recursive: true });
    await fs.writeFile(filePath, file.buffer);

    this.logger.log(`File saved: ${uniqueFileName}`);

    return {
      fileName: uniqueFileName,
      fileUrl: `/${this.uploadDir}/${uniqueFileName}`,
      fileType: extname(file.originalname).slice(1),
      fileSize: file.size,
    };
  }

  async saveFiles(files: any[]): Promise<Array<{ fileName: string; fileUrl: string; fileType: string; fileSize: number }>> {
    const results = [];
    for (const file of files) {
      const result = await this.saveFile(file);
      results.push(result);
    }
    return results;
  }

  async deleteFile(fileUrl: string): Promise<void> {
    try {
      const filePath = join(process.cwd(), fileUrl);
      await fs.unlink(filePath);
      this.logger.log(`File deleted: ${fileUrl}`);
    } catch (error) {
      this.logger.error(`Failed to delete file: ${fileUrl}`, error);
    }
  }
}
