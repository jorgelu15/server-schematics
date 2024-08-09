const Grid = ({ nCuadradosH, nCuadradosV, sizeSquare }: any) => {
    return (
        <>
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
        </>
    );
}

export default Grid;