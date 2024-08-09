import { useEffect, useRef } from "react";
import { IComponente } from "../../interfaces/IComponente";

const Taskbar = ({ setDimensionsTaskbar, onCaptureScreenshot, openMainTaskbar, setOpenMainTaskbar, setcomponents }: any) => {
    
    const taskbarRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setDimensionsTaskbar((prev: any) => {
            return { ...prev, taskbar: taskbarRef?.current?.offsetHeight || 0 }
        })
    }, [])


    const handleOpenArchivos = () => {
        setOpenMainTaskbar({ ...openMainTaskbar, files: !openMainTaskbar.files, edition: false })
    }

    const handleOpenEdition = () => {
        setOpenMainTaskbar({ ...openMainTaskbar, edition: !openMainTaskbar.edition, files: false });
    }

    const onRotateComponent = () => {
        setcomponents((prevComponents: IComponente[]) => {
            return prevComponents.map((component: IComponente) =>
                component.uuid_componente === openMainTaskbar.uuid_component
                    ? { ...component, rotate: (component.rotate + 90) % 360 } // Incrementa la rotación y asegura que esté entre 0 y 360 grados.
                    : component
            );
        });
    };

    console.log(openMainTaskbar)
    

    return (
        <div ref={taskbarRef} className="relative">
            <ul className="flex flex-row bg-slate-700">
                <li className="pr-5 pl-5 pt-2 pb-2 hover:bg-slate-500" onClick={handleOpenArchivos}>
                    <a>Archivo</a>
                </li>
                <li className="pr-5 pl-5 pt-2 pb-2 hover:bg-slate-500" onClick={handleOpenEdition}>
                    <a>Edicion</a>
                </li>
                <li className="pr-5 pl-5 pt-2 pb-2 hover:bg-slate-500">
                    <a>Ayuda</a>
                </li>
            </ul>
            {
                openMainTaskbar.files && (
                    <div className="absolute z-40 w-2/12 shadow">
                        <ul className="bg-slate-600 flex flex-col">
                            <li className="hover:bg-slate-500 p-2">
                                <a>Guardar archivo</a>

                            </li>
                            <li onClick={onCaptureScreenshot} className="hover:bg-slate-500 p-2">
                                <a>Exportar como...</a>
                            </li>
                        </ul>
                    </div>
                )
            }

            {
                openMainTaskbar.edition && (
                    <div className={`absolute z-40 w-2/12 shadow`} style={{left: 93}}>
                        <ul className="bg-slate-600 flex flex-col">
                            <li className="hover:bg-slate-500 p-2" onClick={onRotateComponent}>
                                <a>Rotar componente</a>
                            </li>
                        </ul>
                    </div>
                )
            }
        </div>
    );
}

export default Taskbar;