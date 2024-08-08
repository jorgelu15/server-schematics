const Taskbar = () => {
    return (
        <div>
            <ul className="flex flex-row bg-slate-700">
                <li className="mr-5 ml-5 mt-2 mb-2">
                    <a>Archivo</a>
                </li>
                <li className="mr-5 ml-5 mt-2 mb-2">
                    <a>Ayuda</a>
                </li>
            </ul>
        </div>
    );
}

export default Taskbar;