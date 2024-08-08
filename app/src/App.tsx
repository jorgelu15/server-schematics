import { useRef, useState } from "react";
import Taskbar from "./components/Header/Taskbar";
import TaskUtilities from "./components/Header/TaskUtilities";
import { IComponente } from "./interfaces/IComponente";
import useGrid from "./hooks/useGrid";

function App() {
  const [components, setcomponents] = useState<IComponente[]>([]);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const componentesRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { nCuadradosH, nCuadradosV, sizeSquare } = useGrid(gridRef);

  const onAddComponente = (componente: IComponente) => {
    setcomponents([...components, componente]);
  };

  const onMoveAt = (pageX: number, pageY: number, idx: number) => {
    const elements: IComponente[] = [...components];
    elements[idx] = { ...elements[idx], x: pageX, y: pageY };
    console.log(elements)
    setcomponents(elements);
  };


  const onMoveDownComponent = (e: React.MouseEvent, idx: number) => {
    e.preventDefault();
    const element = componentesRefs.current[idx];
    if (element) {
      let shiftX = e.clientX - element.getBoundingClientRect().left;
      let shiftY = e.clientY - element.getBoundingClientRect().top;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        onMoveAt(moveEvent.pageX - shiftX, moveEvent.pageY - shiftY, idx);
      };

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
  };

  return (
    <div className="w-full h-screen bg-slate-900 text-white flex flex-col">
      <Taskbar />
      <div className="w-full h-full fixed flex top-10">
        <TaskUtilities onAddComponente={onAddComponente} />
        <div className="w-5/6 bg-slate-500 right-0 overflow-hidden" ref={gridRef}>
          <div className="relative w-full h-full">
            {Array.from({ length: nCuadradosH + 1 }).map((_, idx) => (
              <div
                key={idx}
                style={{
                  position: "absolute",
                  top: `${idx * sizeSquare}px`,
                  left: 0,
                  width: "100%",
                  height: "1px",
                  backgroundColor: "#CFEBFA",
                }}
                className="z-0"
              ></div>
            ))}
            {Array.from({ length: nCuadradosV + 1 }).map((_, idx) => (
              <div
                key={idx}
                style={{
                  position: "absolute",
                  top: 0,
                  left: `${idx * sizeSquare}px`,
                  width: "1px",
                  height: "100%",
                  backgroundColor: "#CFEBFA",
                }}
                className="z-0"
              ></div>
            ))}
            {components?.map((componente: IComponente, idx: number) => (
              <div
                key={idx}
                className={`
                  absolute 
                  w-[60px] 
                  h-[60px] 
                  z-10 
                  `}
                style={{ top: `${componente.y}px`, left: `${componente.x}px` }}
                onMouseDown={(e) => onMoveDownComponent(e, idx)}
                ref={(ref) => (componentesRefs.current[idx] = ref)}
              >
                <img src={componente.url_componente} alt={componente.nombre} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
