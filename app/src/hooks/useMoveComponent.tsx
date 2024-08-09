import { IComponente } from "../interfaces/IComponente";

const useMoveComponent = () => {
    const onMoveAt = (pageX: number, pageY: number, idx: number, components: IComponente[], sizeSquare: number, setcomponents: any, dimensionsTaskbars: any) => {
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

        // Limitar el movimiento dentro de los límites especificados usando Math.max y Math.min
        newX = Math.max(0, Math.min(newX, window.innerWidth - dimensionsTaskbars.headerUtilities - sizeSquare));
        newY = Math.max(0, Math.min(newY, window.innerHeight - dimensionsTaskbars.taskbar - sizeSquare));


        elements[idx] = { ...elements[idx], x: newX, y: newY };
        setcomponents(elements);
    };
    return {
        onMoveAt
    }
}

export default useMoveComponent;