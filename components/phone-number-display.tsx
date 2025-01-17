import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PhoneNumberDisplayProps {
  phoneNumber: string;
}

export default function PhoneNumberDisplay({
  phoneNumber,
}: PhoneNumberDisplayProps) {
  function formatPhoneNumber(phone: string) {
    const cleaned = phone.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})$/);
    if (match) {
      return `+${match[1]} ${match[2]} ${match[3]} ${match[4]} ${match[5]}`;
    }
    return phone;
  }

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="bg-dark-400 border-dark-500 text-white/80 rounded-full hover:bg-dark-500 hover:text-white"
            onClick={handleCall}
          >
            <Phone className="mr-2 h-4 w-4" />
            <span className="font-medium">
              {formatPhoneNumber(phoneNumber)}
            </span>
          </Button>
        </TooltipTrigger>
        <TooltipContent className="bg-dark-400 border-dark-500 cursor-pointer">
          <button
            className="outline-none text-white/80 border-none hover:text-white"
            onClick={handleCall}
          >
            <p>Cliquez pour appeler</p>
          </button>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
