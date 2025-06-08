import { useNavigate } from "react-router-dom";
import { DashboardCard } from "@/components/DashBoardCard";

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="p-20">
      <div className="p-6">
        <h3 className="text-3xl font-bold mb-6">Bem-vindo ao Sistema de Gerencamento das Lixeiras Inteligentes!</h3>
        
        <div className="flex flex-wrap gap-4">
          <DashboardCard
            title="Controle de Usuários"
            description="Gerencie os usuários do sistema."
            onClick={() => navigate("/users")}
          />

          <DashboardCard
            title="Controle de Lixeiras"
            description="Visualize e administre as lixeiras inteligentes."
            onClick={() => navigate("/trash")}
          />
        </div>
      </div>
    </div>
  );
}
