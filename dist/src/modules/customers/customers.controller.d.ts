import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
export declare class CustomersController {
    private customersService;
    constructor(customersService: CustomersService);
    create(dto: CreateCustomerDto): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    findAll(page?: number, limit?: number): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    update(id: string, dto: UpdateCustomerDto): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
}
