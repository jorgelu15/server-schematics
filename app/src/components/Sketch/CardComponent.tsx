import { IComponente } from "../../interfaces/IComponente";

interface CardComponentProps {
    item: IComponente;
    onAddComponente: any;
}

const CardComponent = ({ item, onAddComponente }: CardComponentProps) => {
    return (
        <div className="w-[50px] items-center flex flex-col m-2" onClick={() => onAddComponente(item)}>
            <div className="w-full">
                <img src={item.url_componente} alt={item.nombre} />
            </div>
            <div className="w-full">
                <p className="text-center text-xs overflow-hidden whitespace-nowrap text-ellipsis">
                    {item.nombre}
                </p>
            </div>
        </div>
    );
}

export default CardComponent;
