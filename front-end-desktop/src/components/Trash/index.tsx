import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface TrashItem {
    id: number;
    name: string;
    location: string;
    status: string;
}

export function Trash() {
    const [trashList, setTrashList] = useState<TrashItem[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:4444/trash");
                const data = await response.json();
                setTrashList(data);
            } catch (error) {
                console.error("Erro ao buscar as lixeiras:", error);
            }
        };

        fetchData();
    }, []);

    const filteredTrashs = trashList.filter((trash) => {
        return (
            trash.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
            trash.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            trash.location.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const totalPages = Math.ceil(filteredTrashs.length / itemsPerPage);
    const currentItems = filteredTrashs.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const goToPage = (page: number) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    return (
        <div className="pt-16 max-w-8/12 mx-auto p-4">
            <div className="mb-4 flex justify-between items-center">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar por ID, Nome ou Localização"
                    className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary w-3/12"
                />
            </div>
            <Table className="border-separate border-spacing-0.5 rounded-xl overflow-hidden shadow-lg">
                <TableCaption>Lixeiras</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px] bg-primary text-primary-foreground">Id</TableHead>
                        <TableHead className="bg-primary text-primary-foreground">Nome</TableHead>
                        <TableHead className="bg-primary text-primary-foreground">Localização</TableHead>
                        <TableHead className="text-right bg-primary text-primary-foreground">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentItems.map((trash, index) => (
                        <TableRow
                            key={trash.id}
                            className={`${index % 2 === 0 ? "bg-primary/10" : "bg-muted"
                                } hover:bg-violet-200`}
                        >
                            <TableCell className="font-medium text-secondary-foreground">
                                {trash.id}
                            </TableCell>
                            <TableCell className="text-secondary-foreground">
                                {trash.name}
                            </TableCell>
                            <TableCell className="text-secondary-foreground">
                                {trash.location}
                            </TableCell>
                            <TableCell className="text-right">
                                <div
                                    className={`mx-auto w-4 h-4 rounded-full inline-block ${trash.status === "empty"
                                            ? "bg-green-500"
                                            : trash.status === "middle"
                                                ? "bg-orange-400"
                                                : trash.status === "full"
                                                    ? "bg-red-500"
                                                    : "bg-gray-400"
                                        }`}
                                    title={trash.status}
                                ></div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>

                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={4} className="text-right">
                            <button
                                onClick={() => goToPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-4 py-2 mx-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/80 cursor-pointer"
                            >
                                {"<"}
                            </button>
                            <span className="mx-2">{`Página ${currentPage} de ${totalPages}`}</span>
                            <button
                                onClick={() => goToPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 mx-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/80 cursor-pointer"
                            >
                                {">"}
                            </button>
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
}
