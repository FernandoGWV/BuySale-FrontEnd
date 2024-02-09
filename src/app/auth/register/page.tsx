"use client";
import Button from "@/components/Button";
import { UserContextAuth } from "@/context/userContext";
import Api from "@/services/Api";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
const Register = () => {
  const { register, handleSubmit } = useForm();
  const { dataUser } = UserContextAuth();
  const onSubmit = async (data: any) => {
    const { files } = data;
    console.log(data);
    try {
      const resultProduct = await Api.post(
        `/products/create/${1}`,
        { ...data, files: null },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      /*   const result = await Api.post("/imagesUpload", files, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(result.data); */
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="container mx-auto flex items-center h-screen justify-center ">
        <div className="shadow-xl w-96 h-96 flex flex-col justify-center items-center">
          <h1 className="uppercase text-xl w-fit mb-4">cadastro</h1>
          <div className="flex flex-col gap-4  w-fit">
            <input
              type="text"
              placeholder="Titulo do Produto..."
              {...register("title")}
              className="w-80 p-2 rounded outline-none shadow-md border 
              border-gray-50"
            />
            <input
              type="text"
              placeholder="Descrição do Produto..."
              {...register("descripte")}
              className="w-80 p-2 rounded outline-none shadow-md border 
              border-gray-50"
            />
            <input
              type="number"
              placeholder="Valor do produto"
              {...register("price")}
              className="w-80 p-2 rounded outline-none shadow-md border 
              border-gray-50"
            />
            <input type="file" multiple {...register("files")} id="files" />
            <span></span>

            <Button
              text={"Cadastrar-se"}
              handleFunction={() => {
                handleSubmit(onSubmit)();
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
