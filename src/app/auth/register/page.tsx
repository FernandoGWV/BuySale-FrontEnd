"use client";
import Button from "@/components/Button";
import { useEffect, useState } from "react";

const Register = () => {
  const [iconValue, setIconValue] = useState("");
  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file)
      [
        processImg(file, (base64Data: any) => {
          setIconValue(base64Data);
        }),
      ];
  };

  const processImg = (file: any, callback: any) => {
    const reader = new FileReader();
    reader.onloadend = function () {
      const base64Data = reader.result;
      return callback(base64Data);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <section className="container mx-auto flex items-center h-screen justify-center ">
        <div className="shadow-xl w-96 h-96 flex flex-col justify-center items-center">
          <h1 className="uppercase text-xl w-fit mb-4">cadastro</h1>
          <form
            action=""
            className="flex flex-col gap-4  w-fit "
            encType="multipart/form-data"
          >
            <input
              type="text"
              placeholder="Name"
              className="w-80 p-2 rounded outline-none shadow-md border 
              border-gray-50 "
            />
            <input
              type="email"
              placeholder="Email"
              className="w-80 p-2 rounded outline-none shadow-md border 
              border-gray-50 "
            />
            <input
              type="password"
              placeholder="Senha"
              className="w-80 p-2 rounded outline-none shadow-md border 
              border-gray-50"
            />
            <input
              type="text"
              placeholder="Valor a ser adicionado a carteira..."
              className="w-80 p-2 rounded outline-none shadow-md border 
              border-gray-50"
            />
            <input type="file" onChange={handleFileChange} />

            <span></span>

            <Button
              text={"Cadastrar-se"}
              handleFunction={(e: any) => {
                e.preventDefault();
                console.log(iconValue);
              }}
            />
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;
