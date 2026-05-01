import { Controller, Post, UploadedFile, UseInterceptors, UseGuards, Get, Param, Res, StreamableFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { UploadService } from './upload.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Public } from '../../common/decorators/public.decorator';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';

@ApiTags('upload')
@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Upload a file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'File uploaded successfully' })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: any) {
    return await this.uploadService.saveFile(file);
  }

  @Post('multiple')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Upload multiple files' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: { type: 'array', items: { type: 'string', format: 'binary' } },
      },
    },
  })
  @UseInterceptors(FileInterceptor('files'))
  async uploadMultipleFiles(@UploadedFile() files: any[]) {
    return await this.uploadService.saveFiles(files);
  }

  @Get(':fileUrl')
  @Public()
  @ApiOperation({ summary: 'Get uploaded file' })
  async getFile(@Param('fileUrl') fileUrl: string, @Res({ passthrough: true }) res: Response) {
    const filePath = join(process.cwd(), 'uploads', fileUrl);
    const file = createReadStream(filePath);
    return new StreamableFile(file);
  }
}
