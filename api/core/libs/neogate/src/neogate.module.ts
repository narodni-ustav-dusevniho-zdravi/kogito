import { Module } from '@nestjs/common';
import { NeogateService } from './neogate.service';
import { ConfigurationModule } from '@app/configuration/configuration.module';

@Module({
  imports: [ConfigurationModule],
  providers: [NeogateService],
  exports: [NeogateService],
})
export class NeogateModule {}
