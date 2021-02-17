import {
  Controller,
  Get,
  Inject,
  Query,
} from "@nestjs/common"
import { RatioCalculatorService } from "./ratio-calculator.service";
import { GetRatiosInput } from "./models/get-ratios.input";
import { CraftableItemOutput } from "./models/craftable-item.output";

@Controller("craftableItems")
export class RatioCalculatorController {
  @Inject()
  private readonly service: RatioCalculatorService

  @Get()
  public getAllCraftableItems(): Array<CraftableItemOutput> {
    return this.service.getDisplayItems();
  }

  @Get("calculateRatios")
  public calculateRatios(@Query() itemToCalculate: GetRatiosInput): Array<CraftableItemOutput> {
    return this.service.getRatios(itemToCalculate);
  }
}
