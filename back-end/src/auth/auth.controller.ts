import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, AuthLoginDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() data: AuthDto) {
    return this.authService.signup(data);
  }

  @Post('signin')
  signin(@Body() data: AuthLoginDto): Promise<{ token: string }> {
    return this.authService.login(data);
  }
}
