const ComponentElement = ({ componente, componentesRefs, onMoveDownComponent, idx }: any) => {
    return (
        <div
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
    );
}

export default ComponentElement;