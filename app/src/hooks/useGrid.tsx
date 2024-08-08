import { useEffect, useState } from "react";

const useGrid = (gridRef: any) => {
    const [gridDimensions, setGridDimensions] = useState({ width: 800, height: 800 });
    useEffect(() => {
        const updateGridDimensions = () => {
            if (gridRef.current) {
                const width = gridRef.current.clientWidth;
                const height = gridRef.current.clientHeight;
                setGridDimensions({
                    width: Math.max(width, 800),
                    height: Math.max(height, 800),
                });
            }
        };

        updateGridDimensions(); // Initial call
        window.addEventListener('resize', updateGridDimensions); // Update on window resize

        return () => window.removeEventListener('resize', updateGridDimensions); // Cleanup
    }, []);

    const sizeSquare = 30;
    const nCuadradosH = Math.floor(gridDimensions.height / sizeSquare);
    const nCuadradosV = Math.floor(gridDimensions.width / sizeSquare);
    return {
        nCuadradosH,
        nCuadradosV,
        sizeSquare,
        gridDimensions
    }
}

export default useGrid;