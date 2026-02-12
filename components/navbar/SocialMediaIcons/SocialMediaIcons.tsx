import { Button } from "@/components/ui/button";
import { Facebook, Instagram } from "lucide-react";

const SocialMediaIcons = () => {
  return (
    <div className="flex flex-row gap-2">
      <Button>
        <Facebook className="w-5 h-5" />
      </Button>
      <Button>
        <Instagram className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default SocialMediaIcons;
