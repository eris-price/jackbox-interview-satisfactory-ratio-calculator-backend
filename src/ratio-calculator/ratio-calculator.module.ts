import { Module } from "@nestjs/common";
import { RatioCalculatorController } from "./ratio-calculator.controller";
import { RatioCalculatorRepository } from "./ratio-calculator.repository";
import { RatioCalculatorService } from "./ratio-calculator.service";

@Module({
  controllers: [RatioCalculatorController],
  exports: [],
  providers: [RatioCalculatorRepository, RatioCalculatorService],
})
export class RatioCalculatorModule {}
