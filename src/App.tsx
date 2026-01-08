import { useState, useEffect } from 'react';
import './App.css';
import type { GlazeRecipe } from './types/glaze';
import { GlazeCard } from './components/GlazeCard';
import { GlazeForm } from './components/GlazeForm';

function App() {
  const [glazes, setGlazes] = useState<GlazeRecipe[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingGlaze, setEditingGlaze] = useState<GlazeRecipe | undefined>();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSurface, setFilterSurface] = useState<string>('');
  const [filterAtmosphere, setFilterAtmosphere] = useState<string>('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Parallax mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ 
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Load glazes from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('tamaras-glazes');
    if (stored) {
      const parsed = JSON.parse(stored);
      setGlazes(parsed.map((g: any) => ({
        ...g,
        createdAt: new Date(g.createdAt),
        updatedAt: new Date(g.updatedAt),
      })));
    }
  }, []);

  // Save glazes to localStorage whenever they change
  useEffect(() => {
    if (glazes.length > 0) {
      localStorage.setItem('tamaras-glazes', JSON.stringify(glazes));
    }
  }, [glazes]);

  const handleSave = (glazeData: Omit<GlazeRecipe, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingGlaze) {
      // Update existing glaze
      setGlazes(glazes.map(g =>
        g.id === editingGlaze.id
          ? { ...glazeData, id: g.id, createdAt: g.createdAt, updatedAt: new Date() }
          : g
      ));
    } else {
      // Create new glaze
      const newGlaze: GlazeRecipe = {
        ...glazeData,
        id: crypto.randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setGlazes([...glazes, newGlaze]);
    }
    setShowForm(false);
    setEditingGlaze(undefined);
  };

  const handleEdit = (glaze: GlazeRecipe) => {
    setEditingGlaze(glaze);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this glaze recipe?')) {
      setGlazes(glazes.filter(g => g.id !== id));
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingGlaze(undefined);
  };

  // Filter glazes
  const filteredGlazes = glazes.filter(glaze => {
    const matchesSearch = glaze.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         glaze.color.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         glaze.ingredients.some(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSurface = !filterSurface || glaze.surfaceType === filterSurface;
    const matchesAtmosphere = !filterAtmosphere || glaze.atmosphere === filterAtmosphere;
    return matchesSearch && matchesSurface && matchesAtmosphere;
  });

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div 
          className="absolute top-0 -left-4 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"
          style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
        ></div>
        <div 
          className="absolute top-0 -right-4 w-96 h-96 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"
          style={{ transform: `translate(${-mousePosition.x}px, ${mousePosition.y * 0.5}px)` }}
        ></div>
        <div 
          className="absolute -bottom-8 left-20 w-96 h-96 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"
          style={{ transform: `translate(${mousePosition.x * 0.7}px, ${-mousePosition.y * 0.3}px)` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/80 via-pink-50/80 to-blue-50/80 dark:from-gray-900/80 dark:via-purple-900/50 dark:to-blue-900/50"></div>
      </div>

      {/* Header with Parallax */}
      <header 
        className="relative bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 animate-gradient shadow-2xl overflow-hidden"
        style={{ transform: `translateY(${mousePosition.y * 0.1}px)` }}
      >
        {/* Decorative shapes */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-full animate-float"></div>
          <div className="absolute bottom-10 right-20 w-24 h-24 border-4 border-white rounded-lg rotate-45 animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 border-4 border-white rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
          <div className="flex items-center justify-between">
            <div 
              className="parallax-layer"
              style={{ transform: `translateX(${mousePosition.x * 0.5}px)` }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-2xl mb-2 animate-slide-in">
                ✨ Tamara's Glaze Inventory Magic Shop
              </h1>
              <p className="text-purple-100 text-lg drop-shadow-lg animate-slide-in" style={{ animationDelay: '0.1s' }}>
                Your personal glaze recipe library
              </p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="relative bg-white text-purple-600 font-bold py-3 px-8 rounded-full shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 animate-pulse-glow overflow-hidden group"
            >
              <span className="relative z-10">+ New Recipe</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 -z-10 bg-white group-hover:bg-gradient-to-r group-hover:from-purple-100 group-hover:to-pink-100"></div>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        {/* Search and Filters with Glass Effect */}
        <div 
          className="glass rounded-2xl shadow-xl p-8 mb-12 animate-slide-in backdrop-blur-xl border border-white/30"
          style={{ 
            animationDelay: '0.2s',
            transform: `translateY(${mousePosition.y * -0.05}px)`
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-bold text-purple-700 dark:text-purple-300 mb-3 tracking-wide">
                🔍 Search
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, color, or ingredient..."
                className="w-full px-5 py-3 border-2 border-purple-200 dark:border-purple-500/30 rounded-xl focus:ring-4 focus:ring-purple-500/50 focus:border-purple-500 dark:bg-gray-800/50 dark:text-white transition-all duration-300 backdrop-blur-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-purple-700 dark:text-purple-300 mb-3 tracking-wide">
                🎨 Surface Type
              </label>
              <select
                value={filterSurface}
                onChange={(e) => setFilterSurface(e.target.value)}
                className="w-full px-5 py-3 border-2 border-purple-200 dark:border-purple-500/30 rounded-xl focus:ring-4 focus:ring-purple-500/50 focus:border-purple-500 dark:bg-gray-800/50 dark:text-white transition-all duration-300 backdrop-blur-sm"
              >
                <option value="">All Surfaces</option>
                <option value="Gloss">Gloss</option>
                <option value="Matte">Matte</option>
                <option value="Satin">Satin</option>
                <option value="Textured">Textured</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-purple-700 dark:text-purple-300 mb-3 tracking-wide">
                🔥 Atmosphere
              </label>
              <select
                value={filterAtmosphere}
                onChange={(e) => setFilterAtmosphere(e.target.value)}
                className="w-full px-5 py-3 border-2 border-purple-200 dark:border-purple-500/30 rounded-xl focus:ring-4 focus:ring-purple-500/50 focus:border-purple-500 dark:bg-gray-800/50 dark:text-white transition-all duration-300 backdrop-blur-sm"
              >
                <option value="">All Atmospheres</option>
                <option value="Oxidation">Oxidation</option>
                <option value="Reduction">Reduction</option>
                <option value="Both">Both</option>
              </select>
            </div>
          </div>
        </div>

        {/* Glazes Grid */}
        {filteredGlazes.length === 0 ? (
          <div className="text-center py-20 animate-slide-in" style={{ animationDelay: '0.3s' }}>
            <div className="text-8xl mb-6 animate-float">🎨</div>
            <p className="text-2xl text-gray-600 dark:text-gray-300 mb-4 font-light">
              {glazes.length === 0 
                ? "No glaze recipes yet. Create your first masterpiece!"
                : "No glazes match your filters."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGlazes.map((glaze, index) => (
              <div
                key={glaze.id}
                className="animate-slide-in"
                style={{ 
                  animationDelay: `${0.1 * (index % 6)}s`,
                  transform: `translateY(${mousePosition.y * -0.02 * (index % 3)}px)`
                }}
              >
                <GlazeCard
                  glaze={glaze}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Form Modal */}
      {showForm && (
        <GlazeForm
          glaze={editingGlaze}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}

export default App;
