"use client";
import Button from "@/app/components/Button";
import { UserContextAuth } from "@/context/userContext";
import Api from "@/services/Api";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { GoArrowLeft } from "react-icons/go";
const Register = () => {
  const router = useRouter();
  const { dataUser } = UserContextAuth();
  const { register, handleSubmit, formState: {errors} } = useForm();
  let formDataValue;
  const handleImage: any = useRef<HTMLInputElement>(null)
  const onSubmit = async (data: any) => {
    formDataValue = data;
    const { files, title, descripte, price } = data;
    try {
      const resultProduct = await Api.post(`/products/create/${dataUser?.id}`, {
        title,
        descripte,
        price,
      }).then(async (dados: any) => {
        if (dados.data.status) {
          const result = await Api.post(
            `/imagesUpload/${dados.data.product.id}`,
            files
          );
          router.push("/products");
          return result;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="container mx-auto flex items-center h-screen justify-center ">
        <div className="w-96 h-96 flex flex-col justify-center items-center">
          <h1 className="uppercase text-xl w-fit mb-4">
            Cadastrar novo produto
          </h1>
          <div className="flex flex-col gap-4  w-fit">

            <div className="relative">
            <input
              type="text"
              placeholder="Titulo do Produto..."
              {...register("title", {required: true})}
              className="w-80 p-2 rounded outline-none shadow-md border 
              border-gray-50"
            />
           <span className="text-red-600 text-2xl absolute top-3 ml-3 ">*</span>
            {errors.title && <span className="text-red-600">Campo titulo obrigatório ser preenchido</span>}
            </div>

            <div className="relative">
            <textarea
              className="w-80 overflow-auto p-2 rounded outline-none shadow-md border 
              border-gray-50"
              placeholder="Descrição do Produto..."
              {...register("descripte", {required: true})}
              name=""
              id=""
              cols={30}
            ></textarea>
        <span className="text-red-600 text-2xl absolute top-3 ml-3 ">*</span>
            {errors.descripte && <span className="text-red-600">Campo descrição obrigatório ser preenchido</span>}
            </div>

            <div className="relative">
            <input
              type="number"
              placeholder="Valor do produto"
              {...register("price",{required: true})}
              className="w-80 p-2 rounded outline-none shadow-md border 
              border-gray-50"
            />
             <span className="text-red-600 text-2xl absolute top-3 ml-3 ">*</span>
            {errors.price && <span className="text-red-600">Campo preço obrigatório ter um valor</span>}
            </div>
            
            <input ref={handleImage} hidden type="file" multiple  id="files" />
          
            <div className="relative">
            <button
              className="bg-white text-myColor border-2 border-myColor rounded p-2 w-fit"
              onClick={() => {
               
                handleImage.current.click();
              }}
            >
              ESCOLHER IMAGENS
            </button>
            <span className="text-red-600 text-2xl absolute top-3 ml-3 ">*</span>
            <span className="block">Só pode enviar no máximo 4 imagens por produto</span>
            </div>

           { formDataValue ? <Button
              text={"Cadastrar-se"}
              handleFunction={() => {
                handleSubmit(onSubmit)();
              }}
            /> : <button disabled={true} className={`text-red-50 max-w-40 p-1 rounded bg-myColor opacity-45 uppercase`}>Cadastrar-se</button>}
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
