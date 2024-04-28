import { Cut } from './cut';

export interface Wood {
  availableLength: number;
  count: number;
  currentLength: number;
  cuts: Cut[];
  index: number;
  isOverage: boolean;
  length: number;
  stats: string[];
}

export class WoodData {
  public cuts: Cut[] = [];
  public index: number = 0;
  public isOverage: boolean = false;
  public length: number = 0;

  public get count(): number {
    return this.cuts.length;
  }
  public get currentLength(): number {
    return this.cuts.reduce((l, c) => l + c.length + this.bladeThickness, 0);
  }
  public get availableLength(): number {
    return this.length - this.currentLength;
  }
  public get stats(): string[] {
    return [
      `${this.currentLength}" (${this.availableLength}")`,
      `(${((this.currentLength / this.length) * 100).toFixed(2)}%)`,
    ];
  }

  private bladeThickness: number = 1 / 8;

  constructor(
    index: number,
    length: number,
    bladeThickness?: number,
    isOverage: boolean = false
  ) {
    if (!isNaN(index)) {
      this.index = index;
    } else {
      throw new RangeError('"index" is required');
    }

    if (length) {
      this.length = length;
    } else {
      throw new RangeError('"length" is required');
    }

    if (bladeThickness) {
      this.bladeThickness = bladeThickness;
    }

    this.isOverage = isOverage;
  }

  public cut(value: Cut): boolean {
    if (value.length + this.bladeThickness < this.availableLength) {
      this.cuts.push(value);
      return true;
    }
    return false;
  }
  public toWood(): Wood {
    return {
      availableLength: this.availableLength,
      count: this.count,
      currentLength: this.currentLength,
      cuts: this.cuts,
      index: this.index,
      isOverage: this.isOverage,
      length: this.length,
      stats: this.stats,
    };
  }
}
