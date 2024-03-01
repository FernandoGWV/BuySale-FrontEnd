"use client";
import Button from "@/app/components/Button";
import { UserContextAuth } from "@/context/userContext";
import { DesligarIcon, LikeIcon } from "@/imgs";
import Api from "@/services/Api";
import Link from "next/link";
import { AiFillRightCircle } from "react-icons/ai";
import React, { useEffect, useRef, useState } from "react";
const Product = ({ params }: { params: { id: any } }) => {
  const { dataUser, deslogar, isLoged } = UserContextAuth();
  const [productUnique, setProductUnique] = useState<IProduct>();
  const [openProfile, setOpenProfile] = useState(false);
  const imgRef: any = useRef(null);
  const menuRef: any = useRef(null);
  const [imgUnique, setImgUnique] = useState({
    path_image: "",
  });
  const getProduct = async () => {
    try {
      const result = await Api.get("/products").then((dados) => {
        const filteredProducts = dados.data.data.filter(
          (item: any) => item.id === Number(params.id)
        );
        setImgUnique(filteredProducts[0].images[0]);
        console.log(imgUnique);
        setProductUnique(filteredProducts[0]);
        console.log(filteredProducts, "DADOS PRODUSC");
      });
    } catch (error) {}
  };

  useEffect(() => {
    getProduct();
  }, []);
  const onClickOutside = () => {
    setOpenProfile(false);
  };

  useEffect(() => {
    const handleClickOutSide: any = (event: any) => {
      if (event.tagert !== imgRef.current && event.target !== menuRef.current) {
        onClickOutside && onClickOutside();
      }
    };

    document.addEventListener("click", handleClickOutSide);
    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  }, [onClickOutside]);

  return (
    <>
      <nav className="bg-myColor shadow-stone-500 shadow-md">
        <div className=" container mx-auto  flex item-center justify-between h-20 ">
          <div className="  flex items-center gap-5">
            <p className="bg-white p-1 max-w-60  rounded-md text-center uppercase px-2">
              carteira:{" "}
              <span>
                {isLoged
                  ? String(
                      new Intl.NumberFormat("pt-BR", {
                        currency: "BRL",
                        style: "currency",
                      }).format(Number(dataUser?.wallet))
                    )
                  : String(
                      new Intl.NumberFormat("pt-BR", {
                        currency: "BRL",
                        style: "currency",
                      }).format(0)
                    )}
              </span>
            </p>
            <Link href={"/products"}>
              <button className="bg-white p-1 w-32 rounded-md uppercase">
                meus produtos
              </button>
            </Link>
            <button className="bg-white p-1 w-24 rounded-md uppercase">
              comprados
            </button>
          </div>
          <div className="flex items-center relative gap-4">
            {isLoged ? (
              <>
                <p className="text-white uppercase text-xl">{dataUser?.name}</p>
                <img
                  ref={imgRef}
                  onClick={() => {
                    setOpenProfile((prev) => !prev);
                  }}
                  src={`${process.env.NEXT_PUBLIC_URL}/${dataUser?.userIcon}`}
                  alt="userIcon"
                  className="w-16  h-16 rounded-full cursor-pointer"
                />
                {openProfile && (
                  <div
                    className="bg-white rounded-sm animate-dropdown shadow-md absolute z-50 top-20 right-0"
                    ref={menuRef}
                  >
                    <div className="p-3 flex flex-col gap-2 justify-center">
                      <Link
                        className="transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-80 hover:shadow-md duration-300 cursor-pointer hover:bg-myColor hover:bg-opacity-10 p-1 rounded-md"
                        href={"/updateUser"}
                      >
                        Editar perfil
                      </Link>
                      <Link
                        className="transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-80 hover:shadow-md duration-300 cursor-pointer hover:bg-myColor hover:bg-opacity-10 p-1 rounded-md"
                        href={"/products/register"}
                      >
                        Criar um novo Produto
                      </Link>
                    </div>
                  </div>
                )}
                <DesligarIcon
                  className="text-3xl hover:cursor-pointer"
                  onClick={() => deslogar()}
                />{" "}
              </>
            ) : (
              <>
                <Link href={"/auth"}>
                  <button className="bg-white p-1 w-44 rounded-md uppercase">
                    logar / registrar-se
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <div className="container mx-auto">
        <div className="flex justify-between  mt-10">
          <div className="flex flex-col items-center">
            <div>
              <img
                src={`${process.env.NEXT_PUBLIC_URL}/${
                  imgUnique.path_image ? imgUnique.path_image : null
                }`}
                alt="imageProduto"
                className="h-80 w-80 rounded-md"
              />
            </div>
            <div className="flex mt-3 gap-5">
              {productUnique?.images.map((item: any) => {
                if (item.path_image !== imgUnique.path_image) {
                  return (
                    <img
                      src={`${process.env.NEXT_PUBLIC_URL}/${item.path_image}`}
                      alt="imageProduto"
                      className="h-28 w-28 rounded-md"
                    ></img>
                  );
                }
              })}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl uppercase border-b-2 border-zinc-300">
              {productUnique?.title}
            </h1>
            <p className="max-w-96 leading-normal font-bold">
              {productUnique?.descripte}
            </p>
            <span className="text-lg ">
              {String(
                new Intl.NumberFormat("pt-BR", {
                  currency: "BRL",
                  style: "currency",
                }).format(Number(productUnique?.price))
              )}
            </span>
            <div className="flex items-center">
              <LikeIcon style={{ fontSize: 35, cursor: "pointer" }} />{" "}
              <span className="text-xl">
                {productUnique?.like ? productUnique?.like : 1000000}
              </span>
            </div>
            <div>
              <Button text={"Comprar"} />
            </div>
          </div>
        </div>
        <div className="w-4/6 mx-auto bg-zinc-200 shadow-md h-80 mt-5 overflow-auto  relative  rounded-md">
          <div>
            <h1>chat aqui</h1>
          </div>
          <div className="flex w-full justify-center items-center absolute bottom-0">
            <input
              type="text"
              className="w-4/5 outline-none p-3 rounded-md ml-2 mb-2"
              placeholder="Escreva sua mensagem"
            />
            <AiFillRightCircle style={{ marginLeft: 20 }} fontSize={40} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
