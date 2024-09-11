const Input = ({ type, name, placeHolder = "", svg }) => {
  return (
    <>
      <div className="flex flex-col">
        <label
          htmlFor={name}
          className="pt-2 text-base cursor-text transition-all duration-200 ease-in-out transform"
        >
          {name}
        </label>
        <div className="flex justify-between  w-full sm:w-72 md:w-96 p-2 item  ">
          <input
            type={type}
            id={name}
            name={name}
            placeholder={placeHolder}
            className="w-full sm:w-72 md:w-96 px-4 dark:bg-gray-800 outline-none rounded-md"
          />
          {svg && <img src={svg} alt="" />}
        </div>
      </div>
    </>
  );
};

export default Input;
