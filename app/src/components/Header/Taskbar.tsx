import { useEffect, useRef, useState } from "react";

const Taskbar = ({ setDimensionsTaskbar, onCaptureScreenshot }: any) => {
    const [openArchivos, setOpenArchivos] = useState(false);
    const taskbarRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setDimensionsTaskbar((prev: any) => {
            return { ...prev, taskbar: taskbarRef?.current?.offsetHeight || 0 }
        })
    }, [])


    const handleOpenArchivos = () => {
        setOpenArchivos(!openArchivos)
    }
    return (
        <div ref={taskbarRef} className="relative">
            <ul className="flex flex-row bg-slate-700">
                <li className="pr-5 pl-5 pt-2 pb-2 hover:bg-slate-500" onClick={handleOpenArchivos}>
                    <a>Archivo</a>
                </li>
                <li className="pr-5 pl-5 pt-2 pb-2 hover:bg-slate-500">
                    <a>Ayuda</a>
                </li>
            </ul>
            {
                openArchivos && (
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
        </div>
    );
}

export default Taskbar;