import { useEffect, useRef, useState } from "react";
import { componentes } from "../../data/dataComponents";
import { IComponente } from "../../interfaces/IComponente";
import CardComponent from "../Sketch/CardComponent";

const TaskUtilities = ({ onAddComponente, setDimensionsTaskbar }: any) => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const taskRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        setDimensionsTaskbar((prev: any) => {
            return { ...prev, headerUtilities: taskRef?.current?.offsetWidth || 0 }
        })
    }, [])

    // Filtrar componentes en base al término de búsqueda
    const filteredComponents = componentes.filter((component) =>
        component.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div ref={taskRef} className="w-1/6 bg-slate-600 flex flex-col items-center overflow-scroll">
            <div className="w-full p-2">
                <input
                    type="search"
                    placeholder="Buscar"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 rounded text-black"
                />
            </div>
            <div className="flex flex-row flex-wrap justify-around">
                {
                    filteredComponents?.map((element: IComponente, idx: number) => (
                        <CardComponent key={idx} item={element} onAddComponente={onAddComponente} />
                    ))
                }
            </div>
        </div>
    );
}

export default TaskUtilities;