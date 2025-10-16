import { Button } from "@/components/ui/button";
import { Moon, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";

const Header = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-primary" />
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-primary">
            AetherAi
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="hover:bg-primary/10"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-primary" />
            ) : (
              <Moon className="h-5 w-5 text-primary" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-primary/10"
          >
            <User className="h-5 w-5 text-primary" />
          </Button>

          <Button
            className="bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold"
          >
            Login / Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
