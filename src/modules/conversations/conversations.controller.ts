import { Controller, Get, Put, Param, Query, Body, UseGuards, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ConversationsService } from './conversations.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { successResponse } from '../../common/utils/response.util';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { AssignAgentDto, HandoffRequestDto } from './dto/assign-agent.dto';

@ApiTags('conversations')
@Controller('conversations')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class ConversationsController {
  constructor(private conversationsService: ConversationsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all conversations with pagination' })
  @ApiQuery({ name: 'channel', required: false })
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async findAll(
    @Query('channel') channel?: string,
    @Query('status') status?: string,
    @Query('page') page = 1,
    @Query('limit') limit = 20,
  ) {
    const data = await this.conversationsService.findAll(channel, status, undefined, Number(page), Number(limit));
    return successResponse(data);
  }

  @Get('my')
  @ApiOperation({ summary: 'Get my assigned conversations' })
  async getMyConversations(@CurrentUser() user: any) {
    const data = await this.conversationsService.getConversationsByAgent(user.id);
    return successResponse(data);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get conversation by id' })
  async findOne(@Param('id') id: string) {
    const data = await this.conversationsService.findOne(id);
    return successResponse(data);
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'Update conversation status' })
  async updateStatus(@Param('id') id: string, @Query('status') status: string) {
    const data = await this.conversationsService.updateStatus(id, status);
    return successResponse(data, 'Status updated');
  }

  @Put(':id/assign')
  @ApiOperation({ summary: 'Assign conversation to agent' })
  async assignAgent(@Param('id') id: string, @Body() dto: AssignAgentDto) {
    const data = await this.conversationsService.assignAgent(id, dto.agentId);
    return successResponse(data, 'Agent assigned');
  }

  @Post(':id/handoff')
  @ApiOperation({ summary: 'Request handoff to human agent' })
  async requestHandoff(@Param('id') id: string, @Body() dto?: HandoffRequestDto) {
    const data = await this.conversationsService.requestHandoff(id, dto?.reason);
    return successResponse(data, 'Handoff requested');
  }
}