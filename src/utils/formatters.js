/**
 * Utility functions for date and currency formatting across Farsly application.
 */

/**
 * Format ISO timestamp into user-friendly local time string (e.g., "10:15 AM").
 * @param {string} isoString - ISO 8601 formatted date string
 * @returns {string} Formatted time string
 */
export const formatOrderTime = (isoString) => {
  if (!isoString) return '';
  const date = new Date(isoString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

/**
 * Format numeric amount into Indonesian Rupiah currency string (e.g., "Rp 90.000").
 * @param {number} amount - Numeric price
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount) => {
  if (typeof amount !== 'number') return 'Rp 0';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(amount);
};
