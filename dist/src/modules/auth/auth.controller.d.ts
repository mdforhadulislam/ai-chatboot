import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    login(dto: LoginDto): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
}
