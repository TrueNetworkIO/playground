import { useState, useEffect } from 'react';

/**
 * Hook that detects dark mode based on system preference
 * @returns Object with isDarkMode state and toggle function
 */
export function useDarkMode() {
  // Initialize with default value to prevent hydration issues
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Effect to detect and track system preference
  useEffect(() => {
    // Function to check the current preference
    const checkDarkMode = () => {
      const darkModeOn = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(darkModeOn);
      
      if (!isInitialized) {
        setIsInitialized(true);
      }
    };
    
    // Check immediately after mount
    checkDarkMode();
    
    // Set up listener for preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', checkDarkMode);
    
    // Cleanup listener on unmount
    return () => {
      mediaQuery.removeEventListener('change', checkDarkMode);
    };
  }, [isInitialized]);
  
  // Optional: function to manually toggle dark mode
  // Only include this if you want to override system preference
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };
  
  return { isDarkMode, isInitialized, toggleDarkMode };
}