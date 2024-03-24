"use client";
import { UserContextAuth } from "@/context/userContext";
import { DesligarIcon, LikeIcon } from "@/imgs";
import Api from "@/services/Api";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

const Purchased = () => {
  const [openProfile, setOpenProfile] = useState(false);
  const imgRef: any = useRef(null);
  const menuRef: any = useRef(null);
  const [userProducts, setUserProducts] = useState<[]>();
  const { dataUser, isLoged, deslogar } = UserContextAuth();
  const onClickOutside = () => {
    setOpenProfile(false);
  };


  useEffect(() => {
    
       const getProduct = async () => {
    try {
      if(dataUser?.id){
      const result = await Api.get(`/products/listProductsPurchased/${dataUser?.id}`).then((dados) => {
      ;
     
        setUserProducts(dados.data.data);
      });}
    } catch (error) {}
  };
    getProduct();
  }, [dataUser?.id]);

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
      <section>
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
              <Link href={"/"}>
                <button className="bg-white p-1 w-24 rounded-md uppercase">
                  Home
                </button>
              </Link>
            </div>
            <div className="flex items-center relative gap-4">
              {isLoged ? (
                <>
                  <p className="text-white uppercase text-xl">
                    {dataUser?.name}
                  </p>
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
          <h1 className="relative top-20 text-2xl border-black border-b-2 w-fit ">
            Produtos Comprados.
          </h1>
    <div className="flex flex-wrap relative top-36 gap-9">
     {userProducts?.map((item: any) => {
      
        return (
          <>
            <div className="flex flex-col  gap-10  shadow-md w-56  max-h-96 rounded-lg items-center ">
              <div className="mb-2  w-52 flex flex-col justify-center items-start">
                <div className="flex w-full  mt-1 items-center justify-between">
                  <h1 className="uppercase border-b-2 border-myColor ">
                    {item[0].title}
                  </h1>
                
                </div>
                <Link href={`/product/${item[0].id}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${process.env.NEXT_PUBLIC_URL}/${item?.images[0].path_image}`}
                    alt="imageProduct"
                    className="mt-3 mx-auto rounded-lg w-52 h-52"
                  />
                </Link>
                <div className="mt-2 flex items-center justify-between relative  my-0 w-full">
                  <span
                    className="bg-myColor text-neutral-300 p-1 px-2  rounded-lg"
                    style={{ fontSize: 15 }}
                  >
                    {String(
                      new Intl.NumberFormat("pt-BR", {
                        currency: "BRL",
                        style: "currency",
                      }).format(item[0].price)
                    )}
                  </span>
                  <div className="flex relative items-center ">
                    <LikeIcon
                      style={{
                        fontSize: 30,
                      }}
                    />
                    <span>{item.like === null ? 100 : item.like}</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })}
      </div>
          </div>
      </section>
    </>
  );
};

export default Purchased;
