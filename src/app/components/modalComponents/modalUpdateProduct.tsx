import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import Button from "../Button";
import Api from "@/services/Api";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import swal from "sweetalert";
type IProps = {
  modalActive: boolean;
  setModalActive: Dispatch<SetStateAction<boolean>>;
  getOnlyProduct: any;
  onClickOutside: any;
};
const ModalUpdateProduct = (props: IProps) => {
  const { register, handleSubmit } = useForm();
  const { getOnlyProduct, modalActive, onClickOutside } = props;
  const refDiv: any = useRef(null);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const response = await Api.delete(
        `/products/delete/${getOnlyProduct.id}`
      );

      swal("Deletado", "deletamos o seu produto com sucesso", "success").then(
        () => {
          window.location.reload();
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data: any) => {
    try {
      const response = await Api.put(`/products/${getOnlyProduct.id}`, {
        ...data,
        price: getOnlyProduct.price ? getOnlyProduct.price : data.price,
        title: getOnlyProduct.title ? getOnlyProduct.title : data.title,
        descripte: getOnlyProduct.descripte
          ? getOnlyProduct.descripte
          : data.descripte,
      });
      swal("Atualizado", "Produto atualizado com sucesso", "success").then(
        () => {
          window.location.reload();
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleClickOutSide: any = (event: any) => {
      if (refDiv.current && !refDiv.current.contains(event.target)) {
        onClickOutside && onClickOutside();
      }
    };

    document.addEventListener("click", handleClickOutSide, true);
    return () => {
      document.removeEventListener("click", handleClickOutSide, true);
    };
  }, [onClickOutside]);
  return (
    <>
      {modalActive && (
        <div className="flex justify-center items-center w-full h-full bottom-0  z-50 bg-black bg-opacity-20 absolute">
          <div
            ref={refDiv}
            className="flex flex-col items-end w-4/12 h-fit rounded-md bg-white relative px-10"
          >
            <div>
              <IoCloseCircleSharp
                fontSize={30}
                className="cursor-pointer mr-5 mt-2 "
                onClick={() => {
                  props.setModalActive(false);
                }}
              />
            </div>
            <div className="flex  justify-between items-center  gap-5">
              <img
                src={`${process.env.NEXT_PUBLIC_URL}/${getOnlyProduct?.img.path_image}`}
                alt=""
                className="rounded-lg w-60 h-60"
              />

              <div className="flex w-full flex-col   justify-center items-center gap-5">
                <div className="flex w-full gap-2 flex-wrap items-center">
                  <label htmlFor="" className="mr-2">
                    Titulo:
                  </label>
                  <input
                    type="text"
                    placeholder={getOnlyProduct.title}
                    {...register("title")}
                    className="w-11/12  p-2 rounded outline-none shadow-md border 
              border-gray-50"
                  />
                </div>
                <div className="flex w-full gap-2 flex-wrap items-center">
                  <label htmlFor="" className="mr-2">
                    Descrição:
                  </label>
                  {/* <input
                    type="text"
                    placeholder={getOnlyProduct.descripte}
                    className="w-11/12  p-2 rounded outline-none shadow-md border 
              border-gray-50"
                  /> */}

                  <textarea
                    id=""
                    cols={Number("30")}
                    rows={Number("5")}
                    className="w-11/12   p-2 rounded outline-none shadow-md border 
              border-gray-50"
                    {...register("descripte")}
                  ></textarea>
                </div>
                <div className="flex w-full gap-2 flex-wrap justify-between items-center">
                  <label htmlFor="" className="mr-2">
                    Valor:
                  </label>
                  <input
                    type="number"
                    placeholder={getOnlyProduct.price}
                    className="w-11/12 p-2  rounded  outline-none shadow-md border 
              border-gray-50"
                    {...register("price")}
                  />
                </div>
              </div>
            </div>
            <div>
              <Button
                handleFunction={() => {
                  handleDelete();
                }}
                text={"Excluir"}
                style={"mr-5 mt-4 mb-4 bg-red-700"}
              />
              <Button
                handleFunction={() => {
                  handleSubmit(onSubmit)();
                }}
                text={"Salvar"}
                style={"mr-5 mt-4 mb-4"}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalUpdateProduct;
