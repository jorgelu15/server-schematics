import { useRef, useState } from "react";
import Taskbar from "./components/Header/Taskbar";
import TaskUtilities from "./components/Header/TaskUtilities";
import { IComponente } from "./interfaces/IComponente";
import useGrid from "./hooks/useGrid";
import Grid from "./components/Sketch/Grid";
import useMoveComponent from "./hooks/useMoveComponent";
import html2canvas from "html2canvas";
import ComponentElement from "./components/Sketch/Component";

function App() {
  const [components, setcomponents] = useState<IComponente[]>([]);
  const [dimensionsTaskbars, setDimensionsTaskbar] = useState({
    taskbar: 0,
    headerUtilities: 0
  });

  const gridRef = useRef<HTMLDivElement | null>(null);
  const componentesRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { nCuadradosH, nCuadradosV, sizeSquare } = useGrid(gridRef);
  const { onMoveAt } = useMoveComponent();

  const onAddComponente = (componente: IComponente) => {
    setcomponents([...components, componente]);
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
        onMoveAt(moveEvent.pageX - x_.ancho, moveEvent.pageY - y_.alto, idx, components, sizeSquare, setcomponents, dimensionsTaskbars);
      };

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
  };

  const onCaptureScreenshot = async () => {
    if (gridRef.current) {
      try {
        // Asegúrate de que todos los elementos están completamente renderizados
        await new Promise(resolve => requestAnimationFrame(resolve));
        await new Promise(resolve => setTimeout(resolve, 100)); // Esperar un poco más
  
        const canvas = await html2canvas(gridRef.current, {
          useCORS: true, // Para imágenes externas
          scrollX: 0,
          scrollY: -window.scrollY, // Para evitar problemas con el desplazamiento
          backgroundColor: null // Para capturar el fondo transparente
        });
        const dataURL = canvas.toDataURL('image/png');
  
        // Crear un enlace para descargar la imagen
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'esquematico.png';
        link.click();
      } catch (error) {
        console.error('Error capturing screenshot:', error);
      }
    }
  };

  return (
    <div className="w-full h-screen bg-slate-900 text-white flex flex-col">
      <Taskbar setDimensionsTaskbar={setDimensionsTaskbar} onCaptureScreenshot={onCaptureScreenshot} />
      <div className="w-full h-full relative flex">
        <TaskUtilities setDimensionsTaskbar={setDimensionsTaskbar} onAddComponente={onAddComponente} />
        <div className="w-5/6 bg-slate-500 right-0 overflow-hidden relative" ref={gridRef}>
          <div className="w-full h-full absolute" >
            <Grid nCuadradosH={nCuadradosH} nCuadradosV={nCuadradosV} sizeSquare={sizeSquare} />
            {components?.map((componente: IComponente, idx: number) => (
              <ComponentElement
                key={idx}
                idx={idx} // Cambia esto si el componente espera `indice` en lugar de `idx`
                componente={componente}
                componentesRefs={componentesRefs}
                onMoveDownComponent={onMoveDownComponent}
              />

            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
