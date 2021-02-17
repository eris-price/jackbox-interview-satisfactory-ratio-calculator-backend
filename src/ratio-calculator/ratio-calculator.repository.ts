import { Injectable } from "@nestjs/common";
import { CraftableItemEntity } from "./models/craftable-item.entity";

@Injectable()
export class RatioCalculatorRepository {

  // i'm kind of faking a relational database here, if this were a full fledged project,
  // i'd stand up a real database to
  private itemDatabase: Map<string, CraftableItemEntity> = new Map([
    ["ironOre", {
      id: "ironOre",
      displayName: "Iron Ore"
    }],
    ["coal", {
      id: "coal",
      displayName: "Coal"
    }],
    ["copperOre", {
      id: "copperOre",
      displayName: "Copper Ore"
    }],
    ["ironBar", {
      id: "ironBar",
      displayName: "Iron Bar" ,
      ingredients: new Map([
        ["ironOre", 1]
      ]),
    }],
    ["copperBar", {
      id: "copperBar",
      displayName: "Copper Bar" ,
      ingredients: new Map([
        ["copperOre", 1]
      ]),
    }],
    ["steelBar", {
      id: "steelBar",
      displayName: "Steel Bar" ,
      ingredients: new Map([
        ["ironOre", 1.5],
        ["coal", 1.5]
      ]),
    }],
    ["ironPlate", {
      id: "ironPlate",
      displayName: "Iron Plate" ,
      ingredients: new Map([
        ["ironBar", 2]
      ]),
    }],
    ["copperWire", {
      id: "copperWire",
      displayName: "Copper Wire" ,
      ingredients: new Map([
        ["copperBar", 0.3333]
      ]),
    }],
    ["steelBeam", {
      id: "steelBeam",
      displayName: "Steel Beam" ,
      ingredients: new Map([
        ["steelBar", 3]
      ]),
    }],
  ]);

  // filter out items with no ingredients and return them
  public getNonRawItems(): Array<CraftableItemEntity> {
    return Array.from(this.itemDatabase.values()).filter((itemEntity) => {
      return itemEntity.ingredients && itemEntity.ingredients.size > 0;
    });
  }

  public getCraftableItemById(id: string): CraftableItemEntity {
    return this.itemDatabase.get(id);
  }
}
