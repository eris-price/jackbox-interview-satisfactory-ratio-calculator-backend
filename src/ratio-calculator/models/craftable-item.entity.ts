export class CraftableItemEntity {

  public readonly id: string;

  // name of the craftable item
  public readonly displayName: string;

  // a map of ingredient names and their items/minute ratio
  public readonly ingredients?: Map<string, number>;
}
