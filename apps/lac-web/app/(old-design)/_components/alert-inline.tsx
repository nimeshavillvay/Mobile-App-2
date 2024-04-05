import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/old/_components/ui/alert";
import { MdInfoOutline } from "react-icons/md";

type AlertInlineProps = {
  title?: string;
  description: string;
  variant: "destructive" | "default";
};

const AlertInline = ({ title, description, variant }: AlertInlineProps) => {
  return (
    <Alert variant={variant}>
      <MdInfoOutline className="text-xl leading-none" />
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};

export default AlertInline;
