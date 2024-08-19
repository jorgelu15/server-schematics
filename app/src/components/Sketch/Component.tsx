import { useState } from "react";
import { IAncla } from "../../interfaces/IAncla";
import { v4 as uuid_v4 } from "uuid";

const ComponentElement = ({
    componente,
    componentesRefs,
    onMoveDownComponent,
    idx,
    setOpenMainTaskbar,
    openMainTaskbar
}: any) => {
    const [anclas, setAnclas] = useState<IAncla[]>([
        { uuid_ancla: uuid_v4(), status: 0 }, // Ancla superior
        { uuid_ancla: uuid_v4(), status: 0 }, // Ancla derecha
        { uuid_ancla: uuid_v4(), status: 0 }, // Ancla inferior
        { uuid_ancla: uuid_v4(), status: 0 }, // Ancla izquierda
    ]);

    const handleAnclaClick = (index: number) => {
        setAnclas(prevAnclas =>
            prevAnclas.map((ancla, idx) =>
                idx === index ? { ...ancla, status: ancla.status === 0 ? 1 : 0 } : ancla
            )
        );
    };

    return (
        <>
            <div
                className={`
                  absolute 
                  w-[60px] 
                  h-[60px] 
                  z-10 
                  cursor-pointer
                  `}
                style={{
                    top: `${componente.y}px`,
                    left: `${componente.x}px`,
                    transform: `rotate(${componente.rotate}deg)`
                }}
                onMouseDown={(e) => onMoveDownComponent(e, idx)}
                ref={(ref) => (componentesRefs.current[idx] = ref)}
                onClick={() => setOpenMainTaskbar((prev: any) => ({
                    ...prev,
                    edition: !openMainTaskbar.edition,
                    files: false,
                    uuid_component: componente.uuid_componente
                }))}
            >
                <img src={componente.url_componente} alt={componente.nombre} />
                {openMainTaskbar.edition && anclas?.map((ancla: IAncla, idx: number) => {
                    const positionStyles = [
                        { top: '-10px', left: '50%', transform: 'translateX(-50%)' }, // Ancla superior
                        { top: '50%', right: '-10px', transform: 'translateY(-50%)' }, // Ancla derecha
                        { bottom: '-10px', left: '50%', transform: 'translateX(-50%)' }, // Ancla inferior
                        { top: '50%', left: '-10px', transform: 'translateY(-50%)' }, // Ancla izquierda
                    ];

                    return (
                        <div key={idx}
                            className={`absolute z-10 cursor-pointer`}
                            style={positionStyles[idx]}
                            onClick={() => {
                                handleAnclaClick(idx)
                            }}
                        >
                            <p className={`${ancla.status === 0 ? "bg-red-500" : "bg-red-300"} w-[15px] h-[15px]`}></p>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default ComponentElement;
