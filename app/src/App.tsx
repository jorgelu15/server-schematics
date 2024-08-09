import { useRef, useState } from "react";
import Taskbar from "./components/Header/Taskbar";
import TaskUtilities from "./components/Header/TaskUtilities";
import { IComponente } from "./interfaces/IComponente";
import useGrid from "./hooks/useGrid";
import Grid from "./components/Sketch/Grid";

function App() {
  const [components, setcomponents] = useState<IComponente[]>([]);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const componentesRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { nCuadradosH, nCuadradosV, sizeSquare } = useGrid(gridRef);
  const [dimensionsTaskbars, setDimensionsTaskbar] = useState({
    taskbar: 0,
    headerUtilities: 0
  })
  const onAddComponente = (componente: IComponente) => {
    setcomponents([...components, componente]);
  };

  const onMoveAt = (pageX: number, pageY: number, idx: number) => {
    const elements: IComponente[] = [...components];

    //se obtienen las posiciones (x,y) actuales
    const xPos = (pageX);
    const yPos = (pageY);

    let newX, newY;

    //se valida la posicion minima o maxima en (x,y) para que el componente encaje en un cuadro de lˆ2 y se almacena la posicion
    //nueva en las variables
    const roundXPos = Math.round(xPos);
    const roundYPos = Math.round(yPos);
    const roundedSizeSquare = Math.round(sizeSquare);

    const xRemainder = roundXPos % roundedSizeSquare;
    const yRemainder = roundYPos % roundedSizeSquare;

    newX = xRemainder < Math.round(roundedSizeSquare / 2)
        ? roundXPos - xRemainder
        : roundXPos + roundedSizeSquare - xRemainder;

    newY = yRemainder < Math.round(roundedSizeSquare / 2)
        ? roundYPos - yRemainder
        : roundYPos + roundedSizeSquare - yRemainder;

    elements[idx] = { ...elements[idx], x: newX, y: newY };
    
    setcomponents(elements);
  };


  const onMoveDownComponent = (e: React.MouseEvent, idx: number) => {
    e.preventDefault();
    const element = componentesRefs.current[idx];
    if (element) {
      let shiftX = e.clientX - element.getBoundingClientRect().left;
      let shiftY = e.clientY - element.getBoundingClientRect().top;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        let y_ = { alto: window.innerHeight - (gridRef?.current?.offsetHeight || 0) + dimensionsTaskbars.taskbar + shiftY }
        let x_ = { ancho: window.innerWidth - (gridRef.current?.offsetWidth || 0) + shiftX }
        onMoveAt(moveEvent.pageX - x_.ancho, moveEvent.pageY - y_.alto, idx);
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
      <Taskbar setDimensionsTaskbar={setDimensionsTaskbar} />
      <div className="w-full h-full relative flex">
        <TaskUtilities setDimensionsTaskbar={setDimensionsTaskbar} onAddComponente={onAddComponente} />
        <div className="w-5/6 bg-slate-500 right-0 overflow-hidden relative" ref={gridRef}>
          <div className="w-full h-full absolute">
            <Grid nCuadradosH={nCuadradosH} nCuadradosV={nCuadradosV} sizeSquare={sizeSquare} />
            {components?.map((componente: IComponente, idx: number) => (
              <div
                key={idx}
                className={`
                  absolute 
                  w-[60px] 
                  h-[60px] 
                  z-10 
                  cursor-pointer
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
