"use client";
import Button from "@/app/components/Button";
import Header from "@/app/components/header";
import { UserContextAuth } from "@/context/userContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { GoArrowLeft } from "react-icons/go";
const UpdateUser = () => {
  const { register, handleSubmit } = useForm();
  const { dataUser, updateUser, deleteUser } = UserContextAuth();
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const inputRef = useRef(null);
  const router = useRouter();
  const onSubmit = async (data: any) => {
    const newFormData = Object.entries(data)
      .filter(([chave, valor]) => valor.trim() !== "")
      .reduce((obj, [chave, valor]) => {
        obj[chave] = valor;
        return obj;
      }, {});

    await updateUser({ ...newFormData, id: dataUser?.id });
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setFile(file);
    console.log(file, "FILE");
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
          <h1 className="uppercase text-xl w-fit mb-4">Editar Perfil</h1>
          <div className="flex flex-col gap-4  w-fit">
            <input
              type="text"
              placeholder="nome"
              {...register("name")}
              className="w-80 p-2 rounded outline-none shadow-md border 
                border-gray-50"
            />
            <input
              type="text"
              placeholder="email"
              {...register("email")}
              className="w-80 p-2 rounded outline-none shadow-md border 
              border-gray-50"
            />
            <input
              type="password"
              placeholder="Nova senha"
              {...register("password")}
              className="w-80 p-2 rounded outline-none shadow-md border 
              border-gray-50"
            />
            <div>
              <label htmlFor="">
                {"Valor atual da carteira: " +
                  String(
                    new Intl.NumberFormat("pt-br", {
                      currency: "BRL",
                      style: "currency",
                    }).format(Number(dataUser?.wallet))
                  )}
              </label>
              <input
                type="number"
                placeholder="Novo valor da carteira"
                {...register("wallet")}
                className="w-80 p-2 rounded outline-none shadow-md border 
              border-gray-50"
              />
            </div>
            <input
              hidden
              type="file"
              id="file"
              onChange={handleFileChange}
              ref={inputRef}
            />
            <div className="flex gap-10">
              <div>
                <p>Foto atual:</p>
                <img
                  src={`${process.env.NEXT_PUBLIC_URL}/${dataUser?.userIcon}`}
                  alt="preview"
                  style={{ width: "150px", height: "150px" }}
                />
              </div>
              <div>
                Nova Foto:
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="preview"
                    style={{ width: "150px", height: "150px" }}
                  />
                )}
              </div>
            </div>
            <button
              className="bg-white text-myColor border-2 border-myColor rounded p-2 w-fit"
              onClick={() => {
                //@ts-expect-error
                inputRef.current.click();
              }}
            >
              ESCOLHER FOTO
            </button>
            <div className="flex justify-between">
              <Button
                text={"Atualizar"}
                handleFunction={() => {
                  handleSubmit(onSubmit)();
                }}
              />
              <Button
                text={"Excluir conta"}
                handleFunction={() => {
                  deleteUser(Number(dataUser?.id));
                }}
              />
            </div>
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

export default UpdateUser;
