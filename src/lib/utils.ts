import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateOrderNumber(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const randomStr = Math.floor(1000 + Math.random() * 9000).toString();
  return `ORD-${year}${month}${day}-${randomStr}`;
}

export function formatCurrency(amount: number | string | { toNumber?: () => number }): string {
  let numAmount = 0;
  if (typeof amount === 'number') {
    numAmount = amount;
  } else if (typeof amount === 'string') {
    numAmount = parseFloat(amount);
  } else if (amount && typeof amount.toNumber === 'function') {
    numAmount = amount.toNumber();
  }

  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(numAmount).replace('PKR', '₨');
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // Replace spaces with -
    .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
    .replace(/\-\-+/g, '-');     // Replace multiple - with single -
}
