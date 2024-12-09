// components/MarkAllButton.tsx
import { Button } from "@/components/ui/button";

interface MarkAllButtonProps {
  onClick: () => void;
}

const MarkAllButton = ({ onClick }: MarkAllButtonProps) => {
  return (
    <Button onClick={onClick} className="bg-[#3CAE06] text-white">
      Mark All as Read
    </Button>
  );
};

export default MarkAllButton;
