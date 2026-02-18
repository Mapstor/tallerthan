'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Celebrity } from '@/lib/celebrities';
import {
  feetInchesToCm,
  cmToFeetInches,
  formatCmToImperial,
} from '@/lib/utils';

interface HeightComparisonToolProps {
  celebrities: Celebrity[];
}

// Top celebrities to show in quick comparison
const TOP_CELEB_SLUGS = [
  'kevin-hart',
  'tom-cruise',
  'taylor-swift',
  'dwayne-johnson',
  'ariana-grande',
  'chris-hemsworth',
  'beyonce',
  'shaquille-oneal',
  'scarlett-johansson',
  'leonardo-dicaprio',
  'zendaya',
  'brad-pitt',
];

export default function HeightComparisonTool({
  celebrities,
}: HeightComparisonToolProps) {
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial');
  const [feet, setFeet] = useState(5);
  const [inches, setInches] = useState(9);
  const [cm, setCm] = useState(175);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // User's height in cm
  const userHeightCm = unit === 'imperial' ? feetInchesToCm(feet, inches) : cm;

  // Top celebrities for quick comparison
  const topCelebrities = useMemo(() => {
    return TOP_CELEB_SLUGS
      .map(slug => celebrities.find(c => c.slug === slug))
      .filter((c): c is Celebrity => c !== undefined);
  }, [celebrities]);

  // Filtered celebrities for dropdown
  const filteredCelebrities = useMemo(() => {
    if (!searchQuery) return celebrities.slice(0, 20);
    const query = searchQuery.toLowerCase();
    return celebrities.filter((c) =>
      c.name.toLowerCase().includes(query)
    ).slice(0, 20);
  }, [celebrities, searchQuery]);

  // Handle unit toggle
  const handleUnitChange = (newUnit: 'imperial' | 'metric') => {
    if (newUnit === 'metric' && unit === 'imperial') {
      setCm(Math.round(feetInchesToCm(feet, inches)));
    } else if (newUnit === 'imperial' && unit === 'metric') {
      const { feet: f, inches: i } = cmToFeetInches(cm);
      setFeet(f);
      setInches(Math.round(i));
    }
    setUnit(newUnit);
  };


  // Get comparison info for a celebrity
  const getComparison = (celeb: Celebrity) => {
    const diff = userHeightCm - celeb.heightCm;
    const absDiff = Math.abs(diff);

    // Calculate difference in current unit
    let diffInUnit: string;
    if (unit === 'imperial') {
      const totalInches = absDiff / 2.54;
      if (totalInches >= 12) {
        const ft = Math.floor(totalInches / 12);
        const inches = Math.round(totalInches % 12);
        diffInUnit = inches > 0 ? `${ft}' ${inches}"` : `${ft}'`;
      } else {
        diffInUnit = `${Math.round(totalInches)}"`;
      }
    } else {
      diffInUnit = `${Math.round(absDiff)} cm`;
    }

    return {
      diffInUnit,
      isTaller: diff > 0.5,
      isShorter: diff < -0.5,
      isSame: Math.abs(diff) <= 0.5,
    };
  };

  // Scroll to comparison grid
  const scrollToComparison = () => {
    const element = document.getElementById('celebrity-comparison-grid');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-blue-700 px-6 py-8 text-center text-white">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          How Tall Are You?
        </h2>
        <p className="text-blue-100">
          Enter your height to see how you compare to celebrities
        </p>
      </div>

      {/* Height Input Section */}
      <div className="p-6 md:p-8 border-b border-gray-100">
        {/* Unit Toggle */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-full bg-gray-100 p-1">
            <button
              onClick={() => handleUnitChange('imperial')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                unit === 'imperial'
                  ? 'bg-primary text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              ft / in
            </button>
            <button
              onClick={() => handleUnitChange('metric')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                unit === 'metric'
                  ? 'bg-primary text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              cm
            </button>
          </div>
        </div>

        {/* Height Input */}
        <div className="flex justify-center items-end gap-3 mb-4">
          {unit === 'imperial' ? (
            <>
              <div className="text-center">
                <select
                  value={feet}
                  onChange={(e) => setFeet(parseInt(e.target.value))}
                  className="w-24 h-16 text-3xl font-bold text-center border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary appearance-none bg-white cursor-pointer"
                >
                  {[4, 5, 6, 7].map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
                <div className="text-sm text-gray-500 mt-1">feet</div>
              </div>
              <span className="text-3xl font-bold text-gray-300 mb-6">&apos;</span>
              <div className="text-center">
                <select
                  value={inches}
                  onChange={(e) => setInches(parseInt(e.target.value))}
                  className="w-24 h-16 text-3xl font-bold text-center border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary appearance-none bg-white cursor-pointer"
                >
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </select>
                <div className="text-sm text-gray-500 mt-1">inches</div>
              </div>
              <span className="text-3xl font-bold text-gray-300 mb-6">&quot;</span>
            </>
          ) : (
            <div className="text-center">
              <input
                type="number"
                value={cm}
                onChange={(e) => setCm(parseInt(e.target.value) || 150)}
                min={120}
                max={230}
                className="w-32 h-16 text-3xl font-bold text-center border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary"
              />
              <div className="text-sm text-gray-500 mt-1">centimeters</div>
            </div>
          )}
        </div>

        <p className="text-center text-gray-500 mb-6">
          {formatCmToImperial(userHeightCm)} = {Math.round(userHeightCm)} cm
        </p>

        {/* Compare Button */}
        <div className="flex justify-center">
          <button
            onClick={scrollToComparison}
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors text-lg shadow-lg hover:shadow-xl"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Compare Me to Celebrities
          </button>
        </div>
      </div>

      {/* Quick Comparison Grid */}
      <div id="celebrity-comparison-grid" className="p-6 md:p-8 bg-gray-50 scroll-mt-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
          You vs. Famous Celebrities
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {topCelebrities.map((celeb) => {
            const comparison = getComparison(celeb);

            return (
              <Link
                key={celeb.slug}
                href={`/compare/you-vs/${celeb.slug}?height=${Math.round(userHeightCm)}&unit=${unit}`}
                className="relative bg-white rounded-xl p-4 border-2 transition-all hover:shadow-lg group border-gray-100 hover:border-primary"
              >
                {/* Celebrity Photo */}
                <div className="w-16 h-16 rounded-full mx-auto mb-3 overflow-hidden bg-gray-100 ring-2 ring-gray-100 group-hover:ring-primary/30 transition-all">
                  {celeb.imageUrl ? (
                    <img
                      src={celeb.imageUrl}
                      alt={celeb.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl text-gray-400">
                      {celeb.name.charAt(0)}
                    </div>
                  )}
                </div>

                <div className="text-sm font-semibold text-gray-900 truncate">
                  {celeb.name}
                </div>
                <div className="text-xs text-gray-500">
                  {celeb.heightImperial}
                </div>

                {/* Comparison badge */}
                <div className={`mt-2 text-xs font-medium px-2 py-1.5 rounded-lg ${
                  comparison.isSame
                    ? 'bg-gray-100 text-gray-700'
                    : comparison.isTaller
                    ? 'bg-blue-100 text-primary'
                    : 'bg-emerald-100 text-emerald-700'
                }`}>
                  {comparison.isSame
                    ? 'Same height!'
                    : comparison.isTaller
                    ? `You're ${comparison.diffInUnit} taller`
                    : `You're ${comparison.diffInUnit} shorter`}
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Search for specific celebrity */}
      <div className="p-6 md:p-8 border-t border-gray-200 bg-white">
        <div className="max-w-md mx-auto">
          <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
            Or search for a specific celebrity
          </label>
          <div className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsDropdownOpen(true);
              }}
              onFocus={() => setIsDropdownOpen(true)}
              placeholder="Search 130+ celebrities..."
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary"
            />
            {isDropdownOpen && filteredCelebrities.length > 0 && (
              <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl max-h-64 overflow-auto">
                {filteredCelebrities.map((celeb) => {
                  const comparison = getComparison(celeb);
                  return (
                    <Link
                      key={celeb.slug}
                      href={`/compare/you-vs/${celeb.slug}?height=${Math.round(userHeightCm)}&unit=${unit}`}
                      onClick={() => {
                        setSearchQuery('');
                        setIsDropdownOpen(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 border-b border-gray-100 last:border-0"
                    >
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                        {celeb.imageUrl ? (
                          <img
                            src={celeb.imageUrl}
                            alt={celeb.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-lg text-gray-400">
                            {celeb.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{celeb.name}</div>
                        <div className="text-sm text-gray-500">{celeb.heightImperial}</div>
                      </div>
                      <div className={`text-xs font-medium px-2 py-1 rounded-lg flex-shrink-0 ${
                        comparison.isSame
                          ? 'bg-gray-100 text-gray-600'
                          : comparison.isTaller
                          ? 'bg-blue-50 text-primary'
                          : 'bg-emerald-50 text-emerald-600'
                      }`}>
                        {comparison.isSame
                          ? 'Same height'
                          : comparison.isTaller
                          ? `+${comparison.diffInUnit}`
                          : `-${comparison.diffInUnit}`}
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  );
}
