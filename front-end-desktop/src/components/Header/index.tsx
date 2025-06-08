import { LucideLogIn, LucideLogOut, Home, HomeIcon, MapPin, LucideHome } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

export function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const handleLoginLogout = () => {
        setIsLoggedIn(!isLoggedIn);
    };

    function handleHomeClick() {
        navigate("/");
    }

    return (
        <header className="fixed top-0 left-0 right-0 bg-primary text-primary-foreground shadow-md z-10">
            <div className="max-w-10/12 mx-auto p-4 flex justify-between items-center">
                <div
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={handleHomeClick}
                >
                    <LucideHome  />
                    <h1 className="text-2xl font-bold">
                        Sistema de Gerenciamento de Lixeira Inteligente
                    </h1>
                </div>

                <div className="flex items-center space-x-4">
                    {isLoggedIn ? (
                        <>
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>

                            <LucideLogOut onClick={handleLoginLogout} />
                        </>
                    ) : (
                        <LucideLogIn onClick={handleLoginLogout} />
                    )}
                </div>
            </div>
        </header>
    );
}
