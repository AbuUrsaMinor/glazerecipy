import type { GlazeRecipe } from '../types/glaze';

interface GlazeCardProps {
  glaze: GlazeRecipe;
  onEdit: (glaze: GlazeRecipe) => void;
  onDelete: (id: string) => void;
}

export function GlazeCard({ glaze, onEdit, onDelete }: GlazeCardProps) {
  return (
    <div className="group relative bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 p-6 overflow-hidden border border-purple-100 dark:border-purple-500/20 hover:scale-105 hover:-rotate-1">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-400/0 to-pink-400/0 group-hover:from-purple-400/10 group-hover:to-pink-400/10 transition-all duration-500 pointer-events-none"></div>
      
      {/* Shimmer effect on hover */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"></div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:from-purple-500 group-hover:to-pink-500 transition-all duration-300">
            {glaze.name}
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(glaze)}
              className="text-2xl hover:scale-125 transition-transform duration-300 hover:rotate-12 filter hover:drop-shadow-lg"
              aria-label="Edit glaze"
            >
              ✏️
            </button>
            <button
              onClick={() => onDelete(glaze.id)}
              className="text-2xl hover:scale-125 transition-transform duration-300 hover:rotate-12 filter hover:drop-shadow-lg"
              aria-label="Delete glaze"
            >
              🗑️
            </button>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex gap-2 flex-wrap">
            <span className="inline-block bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 text-blue-800 dark:text-blue-200 text-sm px-4 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transition-shadow">
              🔥 Cone {glaze.cone}
            </span>
            <span className="inline-block bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 text-purple-800 dark:text-purple-200 text-sm px-4 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transition-shadow">
              ✨ {glaze.surfaceType}
            </span>
            <span className="inline-block bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 text-green-800 dark:text-green-200 text-sm px-4 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transition-shadow">
              🌡️ {glaze.atmosphere}
            </span>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
            <strong className="text-purple-600 dark:text-purple-400">Color:</strong> {glaze.color}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
            <strong className="text-purple-600 dark:text-purple-400">Temperature:</strong> {glaze.firingTemperature}
          </p>
        </div>

        <div className="border-t-2 border-purple-200 dark:border-purple-700 pt-4 bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4 -mx-2">
          <h4 className="font-bold text-sm text-purple-700 dark:text-purple-300 mb-3 tracking-wide">
            📋 INGREDIENTS:
          </h4>
          <ul className="space-y-2">
            {glaze.ingredients.map((ingredient, index) => (
              <li
                key={index}
                className="text-sm text-gray-700 dark:text-gray-300 flex justify-between items-center bg-white/60 dark:bg-gray-800/60 px-3 py-2 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
              >
                <span className="font-medium">{ingredient.name}</span>
                <span className="font-mono font-bold text-purple-600 dark:text-purple-400">{ingredient.percentage}%</span>
              </li>
            ))}
          </ul>
        </div>

        {glaze.notes && (
          <div className="mt-4 pt-4 border-t-2 border-purple-200 dark:border-purple-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 italic bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg border-l-4 border-yellow-400">
              💡 {glaze.notes}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
