import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { KnowledgeBaseService } from './knowledge-base.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('knowledge-base')
@UseGuards(JwtAuthGuard)
export class KnowledgeBaseController {
  constructor(private knowledgeBaseService: KnowledgeBaseService) {}

  @Get()
  async findAll(@Query('category') category?: string) {
    return this.knowledgeBaseService.findAll(category);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.knowledgeBaseService.findOne(id);
  }

  @Post()
  async create(@Body() dto: any) {
    return this.knowledgeBaseService.create(dto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: any) {
    return this.knowledgeBaseService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.knowledgeBaseService.remove(id);
  }
}
