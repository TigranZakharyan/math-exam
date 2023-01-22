import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { HasRoles } from 'src/decorators/has-roles.decorator';
import { Role } from 'src/enums/role.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('signup')
  register(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin' })
  @HasRoles(Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get()
  all() {
    return this.usersService.findAll();
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'User' })
  @HasRoles(Role.USER)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseGuards(AuthGuard('jwt'))
  @Get('user')
  async user(@Req() request) {
    const result = await this.usersService.findByEmail(request?.user?.email);
    delete result.role;
    delete result.password;
    return result;
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin' })
  @HasRoles(Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('admin')
  async admin(@Req() request) {
    const result = await this.usersService.findByEmail(request?.user?.email);
    delete result.password;
    return result;
  }
}
