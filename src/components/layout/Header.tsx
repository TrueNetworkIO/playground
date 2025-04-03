import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from 'next/image';
import { SunIcon, User, MenuIcon, MoonIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NetworkType } from "@/shared/schema";

interface HeaderProps {
  network: NetworkType;
  onNetworkChange: (network: NetworkType) => void;
  isMobile?: boolean;
  toggleSidebar?: () => void;
  showSidebar?: boolean;
}

export function Header({
  network,
  onNetworkChange,
  isMobile = false,
  toggleSidebar,
  showSidebar = false
}: HeaderProps) {
  const [user] = useState({
    username: "johndoe",
    initials: "JS",
  });

  // Initialize with a default value for server-side rendering
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Move browser API calls to useEffect to avoid SSR issues
  useEffect(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Set the initial state
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      if (newMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return newMode;
    });
  };


  return (
    <header
      className="border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 z-10 relative"
      data-theme-mode={isDarkMode ? 'dark' : 'light'} // Add this for debugging
    >
      <div className="h-16 px-2 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {toggleSidebar && (
            <Button
              variant="ghost"
              size="icon"
              className="mr-1 cursor-pointer"
              onClick={toggleSidebar}
            >
              <MenuIcon className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
            </Button>
          )}

          <div className="flex items-center dark:text-white text-black">
            {/* Logo */}
            <Image width={8} height={9} alt="True Network Logo Icon" src="./true.svg" className="w-8 h-8 rounded bg-primary-500 flex items-center justify-center text-white font-bold" />
              
            <span className={`ml-2 font-semibold text-lg ${isMobile ? 'hidden sm:inline' : ''}`}>
              True Network's <span className="font-light">Playground</span>
            </span>
            {isMobile && (
              <span className="ml-2 font-semibold text-lg sm:hidden dark:text-white">
                Playground
              </span>
            )}
          </div>

        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
      
          {/* Network selector - hide on smallest mobile screens */}
          <div >
            <Select
              value={network}
              onValueChange={(value) => onNetworkChange(value as NetworkType)}
            >
              <SelectTrigger className={`cursor-pointer w-[${isMobile ? '140px' : '160px'}] h-9 text-sm text-black dark:text-white bg-neutral-100 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700`}>
                <SelectValue placeholder="Select network" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem className="cursor-pointer" value="testnet">Raman Testnet</SelectItem>
                <SelectItem className="cursor-pointer" value="mainnet">Bose Network</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </header>
  );
}