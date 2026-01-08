export interface GlazeIngredient {
  name: string;
  percentage: number;
}

export interface GlazeRecipe {
  id: string;
  name: string;
  ingredients: GlazeIngredient[];
  firingTemperature: string;
  cone: string;
  atmosphere: 'Oxidation' | 'Reduction' | 'Both';
  surfaceType: 'Gloss' | 'Matte' | 'Satin' | 'Textured';
  color: string;
  notes?: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
