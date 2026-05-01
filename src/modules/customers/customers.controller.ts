import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { successResponse } from '../../common/utils/response.util';

@Controller('customers')
@UseGuards(JwtAuthGuard)
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Post()
  async create(@Body() dto: CreateCustomerDto) {
    const data = await this.customersService.create(dto);
    return successResponse(data, 'Customer created');
  }

  @Get()
  async findAll(@Query('page') page = 1, @Query('limit') limit = 20) {
    const data = await this.customersService.findAll(Number(page), Number(limit));
    return successResponse(data);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.customersService.findOne(id);
    return successResponse(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateCustomerDto) {
    const data = await this.customersService.update(id, dto);
    return successResponse(data, 'Customer updated');
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.customersService.remove(id);
    return successResponse(null, 'Customer deleted');
  }
}