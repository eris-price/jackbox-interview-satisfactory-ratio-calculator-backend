import { Inject, Injectable } from "@nestjs/common";
import { RatioCalculatorRepository } from "./ratio-calculator.repository";
import { CraftableItemOutput } from "./models/craftable-item.output";
import { GetRatiosInput } from "./models/get-ratios.input";

@Injectable()
export class RatioCalculatorService {
  @Inject()
  private readonly repository: RatioCalculatorRepository;

  // transform the items into their output objects and return
  public getDisplayItems(): Array<CraftableItemOutput> {
    return this.repository.getNonRawItems().map((entity) => {
      return {
        id: entity.id,
        displayName: entity.displayName
      }
    })
  };

  public getRatios(ratioInput: GetRatiosInput): Array<CraftableItemOutput> {
    // get the full item details of the initial item
    const startingItem = this.repository.getCraftableItemById(ratioInput.craftableItemId);
    const ingredientMap: Map<string, number> = new Map();
    let currentItemsToProcess = startingItem.ingredients;
    let itemsRemainingToProcess = currentItemsToProcess.size;

    // flatten the list of ingredients and their total ratio multiplier
    while(itemsRemainingToProcess > 0) {
      // store items for next round
      const nextItemsToProcess = new Map<string, number>();

      // iterate over all current items, add them to the ingredientMap tracking total ratio multiplier, and get get items to process
      currentItemsToProcess.forEach((ratio, itemId) => {
        ingredientMap.set(itemId, (ingredientMap.get(itemId) || 0) + ratio);

        const fullItem = this.repository.getCraftableItemById(itemId);

        fullItem.ingredients?.forEach((nextRatio, nextItemId) => {
          nextItemsToProcess.set(nextItemId,
            (nextItemsToProcess.get(nextItemId) || 0)
             + (nextRatio * ratio)
          );
        });
      });

      currentItemsToProcess = nextItemsToProcess;
      itemsRemainingToProcess = currentItemsToProcess.size;
    };

    const finalItemOutput: Array<CraftableItemOutput> = [];

    ingredientMap.forEach((finalRatioMultiplier, itemId) => {
      const fullItem = this.repository.getCraftableItemById(itemId);
      finalItemOutput.push({
        id: fullItem.id,
        displayName: fullItem.displayName,
        itemsPerMinute: finalRatioMultiplier * ratioInput.itemsPerMinuteTarget,
      });
    });

    return finalItemOutput;
  }
}
