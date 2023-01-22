import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HasRoles } from 'src/decorators/has-roles.decorator';
import { Role } from 'src/enums/role.enum';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RolesGuard } from './guards/role.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({
    description: 'Auth login',
  })
  @ApiOperation({ summary: 'User' })
  @HasRoles(Role.USER)
  @UseGuards(LocalAuthGuard, RolesGuard)
  @Post('user')
  loginUser(@Body() _dto: AuthLoginDto, @Request() req) {
    return this.authService.login(req.user);
  }

  @ApiOkResponse({
    description: 'Auth login',
  })
  @ApiOperation({ summary: 'Admin' })
  @HasRoles(Role.ADMIN)
  @UseGuards(LocalAuthGuard, RolesGuard)
  @Post('admin')
  loginAdmin(@Body() _dto: AuthLoginDto, @Request() req) {
    return this.authService.login(req.user);
  }
}
