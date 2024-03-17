"use client";
import Button from "@/app/components/Button";
import { UserContextAuth } from "@/context/userContext";
import { DesligarIcon, LikeIcon } from "@/imgs";
import Api from "@/services/Api";
import Link from "next/link";
import { AiFillRightCircle } from "react-icons/ai";
import React, { useEffect, useRef, useState } from "react";
import { socket } from "@/socket";
import { useForm } from "react-hook-form";
import { UserIcon } from "@/imgs";

interface IMessage {
  name: string;
  id: number;
  message: string;
  user_id: number;
  product_id: number;
  user_icon: string;
  isOwner: boolean;
}

const Product = ({ params }: { params: { id: any } }) => {
  const { dataUser, deslogar, isLoged } = UserContextAuth();
  const [productUnique, setProductUnique] = useState<IProduct>();
  const [openProfile, setOpenProfile] = useState(false);
  const [socketInstance] = useState(socket());
  const { register, handleSubmit } = useForm();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const imgRef: any = useRef(null);
  const menuRef: any = useRef(null);
  const [imgUnique, setImgUnique] = useState({
    path_image: "",
  });

  socketInstance.emit("entrarNaSala", productUnique?.id);
  useEffect(() => {
    const getProduct = async () => {
      try {
        const result = await Api.get("/products");
        const filteredProducts = result.data.data.filter(
          (item: any) => item.id === Number(params.id)
        );
        setImgUnique(filteredProducts[0].images[0]);
        setProductUnique(filteredProducts[0]);
        const allMessages = filteredProducts.reduce((acc: any, curr: any) => {
          return [
            ...acc,
            ...curr.messages.map((item: any) => {
              return {
                ...item,
                isOwner: item.user_id === dataUser?.id,
              };
            }),
          ];
        }, []);
        setMessages(allMessages);
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
      }
    };

    getProduct();
  }, [dataUser?.id]);

  useEffect(() => {
    socketInstance.on("message", (mensagem) => {
      setMessages((prev) => [...prev, mensagem]);
    });
    return () => {
      socketInstance.off("message");
    };
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const onSubmit = async ({ message }: any) => {
    const inputValue: HTMLInputElement | any =
      document.getElementById("inputMessage");
    if (message !== "") {
      inputValue.value = "";
      const Savemessages: any = {
        message: message,
        name: dataUser?.name,
        user_id: dataUser?.id,
        product_id: productUnique?.id,
        user_icon: dataUser?.userIcon,
      };
      const response = await Api.post("/products/saveMessages", Savemessages);
      socketInstance.emit("message", {
        productId: productUnique?.id,
        mensagem: { ...Savemessages },
      });

      setMessages((prev) => [
        ...prev,
        { ...Savemessages, user_icon: dataUser?.userIcon, isOwner: true },
      ]);
    }
  };

  const ChatMessage = ({ message, isCurrentUser, userAvatar }: any) => {
    return (
      <div
        className={`w-full flex ${
          isCurrentUser ? "justify-end" : "justify-start"
        } items-center mb-2`}
      >
        {!isCurrentUser && (
          <img
            src={userAvatar}
            alt="User Avatar"
            className="w-8 h-8 rounded-full mr-2"
          />
        )}
        <div
          className={`max-w-xs py-2 px-4 rounded-lg ${
            isCurrentUser
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-700"
          }`}
        >
          <p>{message}</p>
        </div>
        {isCurrentUser && (
          <img
            src={userAvatar}
            alt="User Avatar"
            className="w-8 h-8 rounded-full ml-2"
          />
        )}
      </div>
    );
  };

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
            <Link href={"/"}>
              <button className="bg-white p-1 w-24 rounded-md uppercase">
                Home
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
        <div className="w-4/6 mx-auto bg-zinc-200 shadow-md h-80 mt-5   relative  rounded-md">
          <div className="mx-auto p-4">
            <div className="mb-4 h-64 overflow-auto">
              {messages.map((item) => {
                return (
                  <>
                    <ChatMessage
                      message={item.message}
                      isCurrentUser={item.isOwner}
                      userAvatar={`${process.env.NEXT_PUBLIC_URL}/${item?.user_icon}`}
                    />
                  </>
                );
              })}
            </div>
            <div className="flex w-10/12 justify-center items-center absolute bottom-0">
              <input
                type="text"
                id="inputMessage"
                className="w-4/5 outline-none p-3 rounded-md ml-2 mb-2"
                placeholder="Escreva sua mensagem"
                {...register("message")}
              />

              <button type="submit">
                <AiFillRightCircle
                  onClick={handleSubmit(onSubmit)}
                  style={{ marginLeft: 20, cursor: "pointer" }}
                  fontSize={40}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
