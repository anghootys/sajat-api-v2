import { Module } from '@nestjs/common';
import { AssemblyController } from './assembly.controller';

@Module({
  controllers: [AssemblyController]
})
export class AssemblyModule {}
