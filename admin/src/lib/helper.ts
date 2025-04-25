/**
 * Helper utility functions for LocalStorage and common operations
 */

/**
 * Get a value from localStorage and parse it if it's JSON
 * @param key The key to retrieve from localStorage
 * @param defaultValue Optional default value to return if key doesn't exist
 * @returns The retrieved value (parsed if JSON) or the default value
 */
export const getFromLocalStorage = <T>(key: string, defaultValue?: T): T | null => {
    if (typeof window === 'undefined') {
      return defaultValue || null;
    }
    
    const item = localStorage.getItem(key);
    
    if (!item) {
      return defaultValue || null;
    }
    
    // Try to parse as JSON, but return the raw string if it fails
    try {
      return JSON.parse(item);
    } catch (error) {
      return item as unknown as T;
    }
  };
  
  /**
   * Set a value in localStorage, stringifying objects if needed
   * @param key The key to set in localStorage
   * @param value The value to store (will be stringified if it's an object)
   */
  export const setToLocalStorage = <T>(key: string, value: T): void => {
    if (typeof window === 'undefined') {
      return;
    }
    
    if (typeof value === 'object') {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, String(value));
    }
  };
  
  /**
   * Remove an item from localStorage
   * @param key The key to remove from localStorage
   */
  export const removeFromLocalStorage = (key: string): void => {
    if (typeof window === 'undefined') {
      return;
    }
    
    localStorage.removeItem(key);
  };
  
  /**
   * Check if we're running in a browser environment
   * @returns boolean indicating if we're in a browser
   */
  export const isBrowser = (): boolean => {
    return typeof window !== 'undefined';
  };
  
  /**
   * Format a date to a human-readable string
   * @param date The date to format
   * @param locale The locale to use for formatting (defaults to en-US)
   * @returns Formatted date string
   */
  export const formatDate = (
    date: Date | string, 
    locale: string = 'en-US'
  ): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  /**
   * Safely append a query parameter to a URL
   * @param url The base URL
   * @param param The parameter name
   * @param value The parameter value
   * @returns URL with appended parameter
   */
  export const appendUrlParam = (url: string, param: string, value: string): string => {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}${param}=${encodeURIComponent(value)}`;
  };
  
  /**
   * Sleep/delay function for async operations
   * @param ms Milliseconds to sleep
   * @returns Promise that resolves after the specified time
   */
  export const sleep = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };