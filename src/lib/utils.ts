/**
 * Height conversion utilities for TallerThan
 */

// Convert cm to total inches
export function cmToInches(cm: number): number {
  return cm / 2.54;
}

// Convert inches to cm
export function inchesToCm(inches: number): number {
  return inches * 2.54;
}

// Convert feet and inches to total inches
export function feetInchesToTotalInches(feet: number, inches: number): number {
  return feet * 12 + inches;
}

// Convert total inches to feet and inches object
export function totalInchesToFeetInches(totalInches: number): { feet: number; inches: number } {
  const feet = Math.floor(totalInches / 12);
  const inches = totalInches % 12;
  return { feet, inches };
}

// Convert cm to feet and inches object
export function cmToFeetInches(cm: number): { feet: number; inches: number } {
  const totalInches = cmToInches(cm);
  return totalInchesToFeetInches(totalInches);
}

// Convert feet and inches to cm
export function feetInchesToCm(feet: number, inches: number): number {
  const totalInches = feetInchesToTotalInches(feet, inches);
  return inchesToCm(totalInches);
}

// Parse height string like "5'10\"" or "5'10½\"" to cm
export function parseImperialHeight(heightStr: string): number | null {
  // Match patterns like 5'10", 5'10½", 5'10.5"
  const match = heightStr.match(/(\d+)'(\d+)(½|\.5)?(?:"|'')?/);
  if (!match) return null;

  const feet = parseInt(match[1], 10);
  let inches = parseInt(match[2], 10);

  // Handle half inch
  if (match[3]) {
    inches += 0.5;
  }

  return feetInchesToCm(feet, inches);
}

// Parse height string that includes cm like "5'10\" (178 cm)"
export function parseHeightWithCm(heightStr: string): { imperial: string; cm: number } | null {
  // Try to extract cm value directly
  const cmMatch = heightStr.match(/\((\d+(?:\.\d+)?)\s*cm\)/);
  if (cmMatch) {
    const cm = parseFloat(cmMatch[1]);
    // Extract imperial part
    const imperialMatch = heightStr.match(/(\d+'[\d½\.]+(?:"|'')?)/);
    const imperial = imperialMatch ? imperialMatch[1] : formatCmToImperial(cm);
    return { imperial, cm };
  }

  // Fall back to parsing imperial
  const cm = parseImperialHeight(heightStr);
  if (cm) {
    const imperialMatch = heightStr.match(/(\d+'[\d½\.]+(?:"|'')?)/);
    return { imperial: imperialMatch ? imperialMatch[1] : heightStr, cm };
  }

  return null;
}

// Format cm to imperial string like "5'10\""
export function formatCmToImperial(cm: number): string {
  const { feet, inches } = cmToFeetInches(cm);
  const wholeInches = Math.floor(inches);
  const fraction = inches - wholeInches;

  if (fraction >= 0.25 && fraction < 0.75) {
    return `${feet}'${wholeInches}½"`;
  } else if (fraction >= 0.75) {
    return `${feet}'${wholeInches + 1}"`;
  }
  return `${feet}'${wholeInches}"`;
}

// Format height for display: "5'10\" (178 cm)"
export function formatHeightFull(cm: number): string {
  const imperial = formatCmToImperial(cm);
  return `${imperial} (${Math.round(cm)} cm)`;
}

// Calculate height difference in inches
export function heightDifferenceInches(cm1: number, cm2: number): number {
  return cmToInches(cm1) - cmToInches(cm2);
}

// Format height difference for display
export function formatHeightDifference(cm1: number, cm2: number): string {
  const diffInches = heightDifferenceInches(cm1, cm2);
  const absDiff = Math.abs(diffInches);

  if (absDiff < 0.5) {
    return 'same height';
  }

  const direction = diffInches > 0 ? 'taller' : 'shorter';

  if (absDiff >= 12) {
    const feet = Math.floor(absDiff / 12);
    const inches = Math.round(absDiff % 12);
    if (inches === 0) {
      return `${feet} ${feet === 1 ? 'foot' : 'feet'} ${direction}`;
    }
    return `${feet}'${inches}" ${direction}`;
  }

  const roundedInches = Math.round(absDiff * 2) / 2; // Round to nearest half inch
  return `${roundedInches} ${roundedInches === 1 ? 'inch' : 'inches'} ${direction}`;
}

// Generate height slug like "5-ft-10"
export function generateHeightSlug(cm: number): string {
  const { feet, inches } = cmToFeetInches(cm);
  const wholeInches = Math.round(inches);
  return `${feet}-ft-${wholeInches}`;
}

// Parse height slug back to approximate cm
export function parseHeightSlug(slug: string): number | null {
  const match = slug.match(/(\d+)-ft-(\d+)/);
  if (!match) return null;

  const feet = parseInt(match[1], 10);
  const inches = parseInt(match[2], 10);

  return feetInchesToCm(feet, inches);
}

// Get height percentile for US population
export function getHeightPercentile(cm: number, gender: 'male' | 'female'): number {
  // US average heights and standard deviations
  const stats = {
    male: { mean: 175.3, sd: 7.5 }, // 5'9" average
    female: { mean: 161.8, sd: 6.9 }, // 5'3.5" average
  };

  const { mean, sd } = stats[gender];
  const zScore = (cm - mean) / sd;

  // Approximate percentile using normal distribution
  // Using a simple approximation formula
  const percentile = 50 * (1 + Math.sign(zScore) * Math.sqrt(1 - Math.exp(-2 * zScore * zScore / Math.PI)));

  return Math.min(99.9, Math.max(0.1, percentile));
}

// Slugify a name for URLs
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
}
