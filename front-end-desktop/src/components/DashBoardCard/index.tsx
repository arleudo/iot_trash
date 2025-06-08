import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  title: string;
  description: string;
  onClick?: () => void;
  icon?: LucideIcon; 
  className?: string;
}

export function DashboardCard({
  title,
  description,
  onClick,
  icon: Icon,
  className,
}: DashboardCardProps) {
  return (
    <Card
      onClick={onClick}
      className={cn(
        "cursor-pointer w-full max-w-xs text-white shadow-lg rounded-2xl transition-transform duration-300 ease-in-out hover:scale-[1.03] hover:shadow-xl active:scale-[0.98]",
        "bg-gradient-to-br from-primary to-primary/70", // <- aqui o gradiente usa a cor primária
        className
      )}
    >
      <CardContent className="p-6">
        {Icon && <Icon size={32} className="mb-4 text-white" />}
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        <p className="text-sm text-white/80 mt-2">{description}</p>
      </CardContent>
    </Card>
  );
}
