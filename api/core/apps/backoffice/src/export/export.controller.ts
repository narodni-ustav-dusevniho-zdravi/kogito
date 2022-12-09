import { Controller, Get } from '@nestjs/common';
import { UserResolver } from '../user/user.resolver';
import { UserService } from '@app/user';

@Controller('export')
export class ExportController {
  constructor(private readonly userService: UserService) {}

  @Get()
  index(): string {
    return '??';
  }
}
