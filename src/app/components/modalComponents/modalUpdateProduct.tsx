import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import Button from "../Button";
type IProps = {
  modalActive: boolean;
  setModalActive: Dispatch<SetStateAction<boolean>>;
  getOnlyProduct: any;
  onClickOutside: any;
};
const ModalUpdateProduct = (props: IProps) => {
  const { getOnlyProduct, modalActive, onClickOutside } = props;
  const refDiv: any = useRef(null);

  const updateProduct = async () => {
    try {
    } catch (error) {}
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
                className="shadow-md p-4 rounded-lg w-40 h-40"
              />

              <div className="flex w-full flex-col   justify-center items-center gap-5">
                <div className="flex w-full gap-2 flex-wrap items-center">
                  <label htmlFor="" className="mr-2">
                    Titulo:
                  </label>
                  <input
                    type="text"
                    placeholder={getOnlyProduct.title}
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
                    name=""
                    id=""
                    cols="30"
                    rows="5 "
                    className="w-11/12   p-2 rounded outline-none shadow-md border 
              border-gray-50"
                  ></textarea>
                </div>
                <div className="flex w-full gap-2 flex-wrap justify-between items-center">
                  <label htmlFor="" className="mr-2">
                    Valor:
                  </label>
                  <input
                    type="number"
                    placeholder={getOnlyProduct.price}
                    className="w-11/12 p-2 rounded  outline-none shadow-md border 
              border-gray-50"
                  />
                </div>
              </div>
            </div>
            <Button text={"Salvar"} style={"mr-5 mt-4 mb-4"} />
          </div>
        </div>
      )}
    </>
  );
};

export default ModalUpdateProduct;
