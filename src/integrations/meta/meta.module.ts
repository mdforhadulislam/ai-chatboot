import { Module } from '@nestjs/common';
import { MetaService } from './meta.service';
import { MetaSendService } from './meta-send.service';

@Module({
  providers: [MetaService, MetaSendService],
  exports: [MetaService, MetaSendService],
})
export class MetaModule {}