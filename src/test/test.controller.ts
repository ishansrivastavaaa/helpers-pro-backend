import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { Roles } from 'src/auth/roles/roles.decorator';

@Controller('test')
export class TestController {

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getProtected(@Request() req) {
    return {
      message: 'Protected route working',
      user: req.user,
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('admin')
  @Roles('admin')
  adminOnly() {
    return { message: 'Admin access granted' };
  }
}