import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const BackButton = ({path}: {path?: string}) => {
  const navigate = useNavigate();
  return (
    <Button
      variant="ghost"
      size="icon"
      className="mr-2"
      onClick={() => path ? navigate(`/${path}`) : navigate(-1)}    >
      <ArrowLeft className="h-5 w-5" />
    </Button>
  );
};

export default BackButton;
