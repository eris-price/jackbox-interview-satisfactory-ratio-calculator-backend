import { Module } from '@nestjs/common';
import { RatioCalculatorModule } from "./ratio-calculator/ratio-calculator.module";

@Module({
  imports: [RatioCalculatorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
