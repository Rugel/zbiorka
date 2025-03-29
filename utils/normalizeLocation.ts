// utils/normalizeLocation.js
export function normalizeLocation(location: string) {
    return location
      .trim() // Usuwa białe znaki na początku i końcu
      .replace(/\s+/g, ' ') // Zamienia wielokrotne spacje na pojedynczą
      .split(' ') // Dzieli na słowa
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Każde słowo z wielkiej litery
      .join(' '); // Łączy słowa z powrotem w ciąg
  }
  