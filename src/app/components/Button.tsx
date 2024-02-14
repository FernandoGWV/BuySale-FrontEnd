const Button = ({
  text,
  handleFunction,
  handleSubmit,
  widthEdit,
  ...props
}: any) => {
  return (
    <button
      className="text-red-50 
        max-w-40
       p-1 rounded bg-myColor hover:opacity-45 uppercase"
      onClick={handleFunction}
      onSubmit={handleSubmit}
    >
      {text}{" "}
    </button>
  );
};

export default Button;
