import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function chunkBySize<T>(array: T[], oddSize: number, evenSize: number) {
  let result: T[][] = [];
  let currentChunkSize = 0;

  for (let i = 0; i < array.length; i++) {
    const isOdd = result.length % 2 === 0;
    const size = isOdd ? oddSize : evenSize;

    if (currentChunkSize === 0 || currentChunkSize >= size) {
      result.push([]);
      currentChunkSize = 0;
    }

    result[result.length - 1].push(array[i]);
    currentChunkSize += 1;
  }

  return result;
}
