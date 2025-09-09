const Spinner = () => {
    return (
        <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 via-indigo-900 to-blue-800">
            <div className="flex items-center justify-center">
                <div
                    className="
            h-14 w-14
            animate-spin
            rounded-full
            border-4
            border-t-transparent
            border-r-transparent
            bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-600
            shadow-lg shadow-blue-900/40
          "
                ></div>
            </div>
        </div>
    );
};

export default Spinner;
