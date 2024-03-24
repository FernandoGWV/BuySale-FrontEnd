"use client";
import Button from "@/app/components/Button";
import Header from "@/app/components/header";
import { UserContextAuth } from "@/context/userContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { GoArrowLeft } from "react-icons/go";
const Register = () => {
  const { register, handleSubmit, formState: {errors} } = useForm();
  const { newUser } = UserContextAuth();
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const inputRef = useRef(null);
  const router = useRouter();
  const onSubmit = async (data: any) => {

   if(file !==null){
   await newUser(data, file);
   }
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setFile(file);

    if (file) {
      const reader: any = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <section className="container mx-auto flex items-center h-screen justify-center ">
        <div className="w-96 h-96 flex flex-col justify-center items-center">
          <h1 className="uppercase text-xl w-fit mb-4">cadastro</h1>
          <div className="flex flex-col gap-4  w-fit">
            <div className="relative">
            <input
              type="text"
              placeholder="nome"
              {...register("name", {required: true})}
              className="w-80 p-2 rounded outline-none shadow-md border 
                border-gray-50"
            />
            <span className="text-red-600 text-2xl absolute top-3 ml-3 ">*</span>
            </div>
            
             {errors.name && <span className="text-red-600">Campo nome  obrigatório</span>}
             <div className="relative">
            <input
              type="text"
              placeholder="email"
              {...register("email", { required: true})}
              className="w-80 p-2 rounded outline-none shadow-md border 
              border-gray-50"
            />
            <span className="text-red-600 text-2xl absolute top-3 ml-3 ">*</span>
            </div>
             {errors.email && <span className="text-red-600">Campo email obrigatório</span>}
             <div className="relative">
            <input
              type="password"
              placeholder="Senha"
              {...register("password",{required: true})}
              className="w-80 p-2 rounded outline-none shadow-md border 
              border-gray-50"
            />
            <span className="text-red-600 text-2xl absolute top-3 ml-3 ">*</span>
            </div>
            {errors.password && <span className="text-red-600">Campo senha obrigatório</span>}
            <input
              type="number"
              placeholder="Valor a colocar na carteira..."
              {...register("wallet")}
              className="w-80 p-2 rounded outline-none shadow-md border 
              border-gray-50"
            />
            
            <input
              hidden
              type="file"
              id="file"
              onChange={handleFileChange}
              ref={inputRef}
            />
          
            {imagePreview && (
              <img
                src={imagePreview}
                alt="preview"
                style={{ maxWidth: "150px", maxHeight: "150px" }}
              />
            )}
            <button
              className="bg-white text-myColor border-2 border-myColor rounded p-2 w-fit"
              onClick={() => {
                //@ts-expect-error
                inputRef.current.click();
              }}
            >
              ESCOLHER FOTO
            </button>
            

            <Button
              text={"Cadastrar-se"}
              handleFunction={() => {
                handleSubmit(onSubmit)();
              }}
            />
          </div>
          <button
            className="bg-myColor p-1 max-w-40 text-white rounded-md text-center uppercase px-2 mt-5"
            onClick={() => router.push("/")}
          >
            <GoArrowLeft />
          </button>
        </div>
      </section>
    </>
  );
};

export default Register;
