"use client";
import Button from "@/app/components/Button";
import { UserContextAuth } from "@/context/userContext";
import Api from "@/services/Api";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { GoArrowLeft } from "react-icons/go";
import { toast } from "react-toastify";

const Register = () => {
  const router = useRouter();
  const { dataUser } = UserContextAuth();
  const [validateFiles, setValidateFiles] = useState<boolean>(false);
  const [files, setFiles] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleImage: any = useRef<HTMLInputElement>(null);
  const [imagesPreview, setImagePreview] = useState<[]>([]);

  const handleFileChange = (event: any) => {
    setValidateFiles(false);
    const files = event.target.files;
    const imagesPreviewArray: any = [];
    setFiles(files);
    if (files && files.length <= 4) {
      for (let i = 0; i < files.length; i++) {
        const reader: any = new FileReader();
        const file = files[i];

        reader.onload = () => {
          imagesPreviewArray.push(reader.result);
          // Verifica se todas as imagens foram processadas
          if (imagesPreviewArray.length === files.length) {
            setImagePreview(imagesPreviewArray);
          }
        };

        reader.readAsDataURL(file);
      }
    } else {
      // Se mais de 4 arquivos forem selecionados, faça o tratamento adequado aqui
      toast.error("Só pode enviar 4 imagens no máximo!");
      // Limpa a seleção atual
      event.target.value = null;
    }
  };

  const onSubmit = async (data: any) => {
    const { title, descripte, price } = data;
    if (!files) {
      return setValidateFiles(true);
    }
    try {
      const resultProduct = await Api.post(`/products/create/${dataUser?.id}`, {
        title,
        descripte,
        price,
        files,
      }).then(async (dados: any) => {
        console.log(dados);
        toast.success(`${dados.data.message}`);
        if (dados.data.status) {
          const result = await Api.post(
            `/imagesUpload/${dados.data.product.id}`,
            files
          );
          router.push("/products");
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
                {...register("title", { required: true })}
                className="w-80 p-2 rounded outline-none shadow-md border 
              border-gray-50"
              />
              <span className="text-red-600 text-2xl absolute top-3 ml-3 ">
                *
              </span>
              {errors.title && (
                <span className="text-red-600">
                  Campo titulo obrigatório ser preenchido
                </span>
              )}
            </div>
            <div className="relative">
              <textarea
                className="w-80 overflow-auto p-2 rounded outline-none shadow-md border 
              border-gray-50"
                placeholder="Descrição do Produto..."
                cols={30}
                {...register("descripte", { required: true })}
              ></textarea>
              <span className="text-red-600 text-2xl absolute top-3 ml-3 ">
                *
              </span>
              {errors.descripte && (
                <span className="text-red-600">
                  Campo descrição obrigatório ser preenchido
                </span>
              )}
            </div>
            <div className="relative">
              <input
                type="number"
                placeholder="Valor do produto"
                {...register("price", { required: true })}
                className="w-80 p-2 rounded outline-none shadow-md border 
              border-gray-50"
              />
              <span className="text-red-600 text-2xl absolute top-3 ml-3 ">
                *
              </span>
              {errors.price && (
                <span className="text-red-600">
                  Campo preço obrigatório ter um valor
                </span>
              )}
            </div>
            <input
              ref={handleImage}
              hidden
              onChange={handleFileChange}
              type="file"
              multiple
              id="files"
            />
            <div className="relative">
              <button
                className="bg-white text-myColor border-2 border-myColor rounded p-2 w-fit"
                onClick={() => {
                  handleImage.current.click();
                }}
              >
                ESCOLHER IMAGENS
              </button>
              <span className="text-red-600 text-2xl absolute top-3 ml-3 ">
                *
              </span>
              {validateFiles ? (
                <span className="block text-red-600">
                  Obrigátorio enviar pelo menos uma imagem
                </span>
              ) : null}
              <span className="block">
                Só pode enviar no máximo 4 imagens por produto
              </span>
            </div>
            <div className="flex items-center   gap-5">
              {imagesPreview &&
                imagesPreview.map((item: any) => {
                  return (
                    <>
                      <div
                        className="w-32 h-32"
                        style={{
                          backgroundImage: `url(${item})`,
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      ></div>
                    </>
                  );
                })}
            </div>
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
