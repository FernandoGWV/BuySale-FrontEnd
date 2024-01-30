"use client";
import Button from "@/components/Button";
import { UserContextAuth } from "@/context/userContext";
import Api from "@/services/Api";
import { useEffect, useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    wallet: "",
    iconUser: null,
  });
  let dataRegister;
  const handleOnChange = (e: any) => {
    const { name, value, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files ? files[0] : value,
    }));
  };
  const handleSubmit = async (e: any) => {
    try {
      const result = await Api.post("account/createAccount", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return (dataRegister = result.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="container mx-auto flex items-center h-screen justify-center ">
        <div className="shadow-xl w-96 h-96 flex flex-col justify-center items-center">
          <h1 className="uppercase text-xl w-fit mb-4">cadastro</h1>
          <form
            method="post"
            className="flex flex-col gap-4  w-fit "
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="name"
              name="name"
              className="w-80 p-2 rounded outline-none shadow-md border 
              border-gray-50"
              value={formData.name}
              onChange={handleOnChange}
            />
            <input
              type="email"
              placeholder="email"
              name="email"
              className="w-80 p-2 rounded outline-none shadow-md border 
              border-gray-50"
              value={formData.email}
              onChange={handleOnChange}
            />
            <input
              type="password"
              placeholder="senha"
              name="password"
              className="w-80 p-2 rounded outline-none shadow-md border 
              border-gray-50"
              value={formData.password}
              onChange={handleOnChange}
            />
            <input
              type="text"
              placeholder="Valor a ser adicionado a carteira..."
              name="wallet"
              className="w-80 p-2 rounded outline-none shadow-md border 
              border-gray-50"
              value={formData.wallet}
              onChange={handleOnChange}
            />
            <input
              type="file"
              name="iconUser"
              id="iconUser"
              onChange={handleOnChange}
            />
            <span></span>

            <Button text={"Cadastrar-se"} />
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;
