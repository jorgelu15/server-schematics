const ComponentElement = ({ 
    componente, 
    componentesRefs, 
    onMoveDownComponent, 
    idx, 
    setOpenMainTaskbar 
}: any) => {
    return (
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
                transform: `rotate(${componente.rotate}deg)` // Asegura la rotación con 'deg'
            }}
            onMouseDown={(e) => onMoveDownComponent(e, idx)}
            ref={(ref) => (componentesRefs.current[idx] = ref)}
            onClick={() => setOpenMainTaskbar((prev: any) => ({
                ...prev, 
                edition: true, 
                files: false, 
                uuid_component: componente.uuid_componente 
            }))}
        >
            <img src={componente.url_componente} alt={componente.nombre} />
        </div>
    );
}

export default ComponentElement;
