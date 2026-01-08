import { useState } from 'react';
import type { GlazeRecipe, GlazeIngredient } from '../types/glaze';

interface GlazeFormProps {
  glaze?: GlazeRecipe;
  onSave: (glaze: Omit<GlazeRecipe, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

export function GlazeForm({ glaze, onSave, onCancel }: GlazeFormProps) {
  const [name, setName] = useState(glaze?.name || '');
  const [cone, setCone] = useState(glaze?.cone || '6');
  const [firingTemperature, setFiringTemperature] = useState(
    glaze?.firingTemperature || '2232°F (1222°C)'
  );
  const [atmosphere, setAtmosphere] = useState<'Oxidation' | 'Reduction' | 'Both'>(
    glaze?.atmosphere || 'Oxidation'
  );
  const [surfaceType, setSurfaceType] = useState<'Gloss' | 'Matte' | 'Satin' | 'Textured'>(
    glaze?.surfaceType || 'Gloss'
  );
  const [color, setColor] = useState(glaze?.color || '');
  const [notes, setNotes] = useState(glaze?.notes || '');
  const [ingredients, setIngredients] = useState<GlazeIngredient[]>(
    glaze?.ingredients || [{ name: '', percentage: 0 }]
  );

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: '', percentage: 0 }]);
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleIngredientChange = (
    index: number,
    field: 'name' | 'percentage',
    value: string | number
  ) => {
    const updated = [...ingredients];
    updated[index] = { ...updated[index], [field]: value };
    setIngredients(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      cone,
      firingTemperature,
      atmosphere,
      surfaceType,
      color,
      notes,
      ingredients: ingredients.filter(i => i.name && i.percentage > 0),
    });
  };

  const totalPercentage = ingredients.reduce((sum, ing) => sum + Number(ing.percentage), 0);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-gradient-to-br from-white via-purple-50 to-pink-50 dark:from-gray-800 dark:via-purple-900/30 dark:to-pink-900/30 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-purple-200 dark:border-purple-500/30 animate-slide-in">
        <div className="sticky top-0 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 border-b-4 border-purple-300 dark:border-purple-700 p-6 rounded-t-3xl shadow-lg z-10">
          <h2 className="text-3xl font-bold text-white drop-shadow-lg">
            {glaze ? '✏️ Edit Glaze Recipe' : '✨ New Glaze Recipe'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="transform transition-all duration-300 hover:scale-[1.02]">
            <label className="block text-sm font-bold text-purple-700 dark:text-purple-300 mb-3 tracking-wide">
              🎨 Recipe Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-5 py-3 border-2 border-purple-200 dark:border-purple-500/30 rounded-xl focus:ring-4 focus:ring-purple-500/50 focus:border-purple-500 dark:bg-gray-800/50 dark:text-white transition-all duration-300 backdrop-blur-sm shadow-md hover:shadow-lg"
              placeholder="e.g., Celadon Blue"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="transform transition-all duration-300 hover:scale-[1.02]">
              <label className="block text-sm font-bold text-purple-700 dark:text-purple-300 mb-3 tracking-wide">
                🔥 Cone *
              </label>
              <input
                type="text"
                value={cone}
                onChange={(e) => setCone(e.target.value)}
                required
                className="w-full px-5 py-3 border-2 border-purple-200 dark:border-purple-500/30 rounded-xl focus:ring-4 focus:ring-purple-500/50 focus:border-purple-500 dark:bg-gray-800/50 dark:text-white transition-all duration-300 backdrop-blur-sm shadow-md hover:shadow-lg"
                placeholder="e.g., 6, 10"
              />
            </div>

            <div className="transform transition-all duration-300 hover:scale-[1.02]">
              <label className="block text-sm font-bold text-purple-700 dark:text-purple-300 mb-3 tracking-wide">
                🌡️ Firing Temperature *
              </label>
              <input
                type="text"
                value={firingTemperature}
                onChange={(e) => setFiringTemperature(e.target.value)}
                required
                className="w-full px-5 py-3 border-2 border-purple-200 dark:border-purple-500/30 rounded-xl focus:ring-4 focus:ring-purple-500/50 focus:border-purple-500 dark:bg-gray-800/50 dark:text-white transition-all duration-300 backdrop-blur-sm shadow-md hover:shadow-lg"
                placeholder="e.g., 2232°F (1222°C)"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="transform transition-all duration-300 hover:scale-[1.02]">
              <label className="block text-sm font-bold text-purple-700 dark:text-purple-300 mb-3 tracking-wide">
                💨 Atmosphere *
              </label>
              <select
                value={atmosphere}
                onChange={(e) => setAtmosphere(e.target.value as 'Oxidation' | 'Reduction' | 'Both')}
                required
                className="w-full px-5 py-3 border-2 border-purple-200 dark:border-purple-500/30 rounded-xl focus:ring-4 focus:ring-purple-500/50 focus:border-purple-500 dark:bg-gray-800/50 dark:text-white transition-all duration-300 backdrop-blur-sm shadow-md hover:shadow-lg"
              >
                <option value="Oxidation">Oxidation</option>
                <option value="Reduction">Reduction</option>
                <option value="Both">Both</option>
              </select>
            </div>

            <div className="transform transition-all duration-300 hover:scale-[1.02]">
              <label className="block text-sm font-bold text-purple-700 dark:text-purple-300 mb-3 tracking-wide">
                ✨ Surface Type *
              </label>
              <select
                value={surfaceType}
                onChange={(e) => setSurfaceType(e.target.value as 'Gloss' | 'Matte' | 'Satin' | 'Textured')}
                required
                className="w-full px-5 py-3 border-2 border-purple-200 dark:border-purple-500/30 rounded-xl focus:ring-4 focus:ring-purple-500/50 focus:border-purple-500 dark:bg-gray-800/50 dark:text-white transition-all duration-300 backdrop-blur-sm shadow-md hover:shadow-lg"
              >
                <option value="Gloss">Gloss</option>
                <option value="Matte">Matte</option>
                <option value="Satin">Satin</option>
                <option value="Textured">Textured</option>
              </select>
            </div>
          </div>

          <div className="transform transition-all duration-300 hover:scale-[1.02]">
            <label className="block text-sm font-bold text-purple-700 dark:text-purple-300 mb-3 tracking-wide">
              🌈 Color *
            </label>
            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              required
              className="w-full px-5 py-3 border-2 border-purple-200 dark:border-purple-500/30 rounded-xl focus:ring-4 focus:ring-purple-500/50 focus:border-purple-500 dark:bg-gray-800/50 dark:text-white transition-all duration-300 backdrop-blur-sm shadow-md hover:shadow-lg"
              placeholder="e.g., Light Blue-Green"
            />
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-2xl border-2 border-purple-200 dark:border-purple-500/30">
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-bold text-purple-700 dark:text-purple-300 tracking-wide">
                📋 Ingredients * (Total: {totalPercentage.toFixed(1)}%)
              </label>
              <button
                type="button"
                onClick={handleAddIngredient}
                className="text-sm bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-4 py-2 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                + Add Ingredient
              </button>
            </div>
            <div className="space-y-3">
              {ingredients.map((ingredient, index) => (
                <div key={index} className="flex gap-3 group">
                  <input
                    type="text"
                    value={ingredient.name}
                    onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                    placeholder="Ingredient name"
                    className="flex-1 px-4 py-3 border-2 border-purple-200 dark:border-purple-500/30 rounded-xl focus:ring-4 focus:ring-purple-500/50 focus:border-purple-500 dark:bg-gray-800/50 dark:text-white transition-all duration-300 shadow-md group-hover:shadow-lg"
                  />
                  <input
                    type="number"
                    step="0.1"
                    value={ingredient.percentage || ''}
                    onChange={(e) => handleIngredientChange(index, 'percentage', parseFloat(e.target.value) || 0)}
                    placeholder="%"
                    className="w-28 px-4 py-3 border-2 border-purple-200 dark:border-purple-500/30 rounded-xl focus:ring-4 focus:ring-purple-500/50 focus:border-purple-500 dark:bg-gray-800/50 dark:text-white transition-all duration-300 shadow-md group-hover:shadow-lg"
                  />
                  {ingredients.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveIngredient(index)}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 px-3 hover:scale-125 transition-transform duration-300 text-xl"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
            {totalPercentage !== 100 && ingredients.some(i => i.name && i.percentage) && (
              <p className="text-sm font-bold text-yellow-700 dark:text-yellow-400 mt-3 bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-lg border-l-4 border-yellow-500 animate-pulse">
                ⚠️ Total should equal 100% (currently {totalPercentage.toFixed(1)}%)
              </p>
            )}
          </div>

          <div className="transform transition-all duration-300 hover:scale-[1.02]">
            <label className="block text-sm font-bold text-purple-700 dark:text-purple-300 mb-3 tracking-wide">
              📝 Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full px-5 py-3 border-2 border-purple-200 dark:border-purple-500/30 rounded-xl focus:ring-4 focus:ring-purple-500/50 focus:border-purple-500 dark:bg-gray-800/50 dark:text-white transition-all duration-300 shadow-md hover:shadow-lg"
              placeholder="Application tips, test results, variations..."
            />
          </div>

          <div className="flex gap-4 justify-end pt-6 border-t-2 border-purple-200 dark:border-purple-700">
            <button
              type="button"
              onClick={onCancel}
              className="px-8 py-3 border-2 border-purple-300 dark:border-purple-600 rounded-full text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/30 font-bold transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 hover:from-purple-700 hover:via-pink-600 hover:to-blue-700 text-white rounded-full font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-gradient"
            >
              {glaze ? '✅ Update Recipe' : '✨ Save Recipe'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
