import { componentes } from "../../data/dataComponents";
import { IComponente } from "../../interfaces/IComponente";
import CardComponent from "../Sketch/CardComponent";

const TaskUtilities = ({ onAddComponente }: any) => {
    return (
        <div className="w-1/6 bg-slate-600 flex flex-col items-center overflow-scroll">
            <div className="w-full p-2">
                <input
                    type="search"
                    placeholder="Buscar"
                    className="w-full p-2 rounded text-black"
                />
            </div>
            <div className="flex flex-row flex-wrap justify-around">
                {
                    componentes?.map((element: IComponente, idx: number) => (
                        <CardComponent key={idx} item={element} onAddComponente={onAddComponente} />
                    ))
                }
            </div>
        </div>
    );
}

export default TaskUtilities;