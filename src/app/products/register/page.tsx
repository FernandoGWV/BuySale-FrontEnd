"use client";
import Button from "@/app/components/Button";
import { UserContextAuth } from "@/context/userContext";
import Api from "@/services/Api";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { GoArrowLeft } from "react-icons/go";
const Register = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const { dataUser } = UserContextAuth();
  const onSubmit = async (data: any) => {
    const { files, title, descripte, price } = data;
    console.log(data);
    try {
      const resultProduct = await Api.post(`/products/create/${1}`, {
        title,
        descripte,
        price,
      }).then(async (dados: any) => {
        console.log(dados.data.product, "DADOS");
        if (dados.data.status) {
          const result = await Api.post(
            `/imagesUpload/${dados.data.product.id}`,
            files
          );
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
          <button
            className="bg-myColor p-1 max-w-40 text-white rounded-md text-center uppercase px-2 mt-5"
            onClick={router.back}
          >
            <GoArrowLeft />
          </button>
        </div>
      </section>
    </>
  );
};

export default Register;
