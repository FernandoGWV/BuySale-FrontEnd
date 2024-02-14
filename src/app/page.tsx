"use client"; 
import { UserContextAuth } from "@/context/userContext";
import { DesligarIcon, UserIcon } from "@/imgs";
import Image from "next/image";
import { useEffect } from "react";
const Home = () => {
  const { dataUser } = UserContextAuth();
  useEffect(() => {
    console.log(dataUser);
  }, []);
  return (
    <>
      <nav className="bg-myColor">
        <div className=" container mx-auto  flex item-center justify-between h-20 ">
          <div className="  flex items-center gap-5">
            <p className="bg-white p-1 max-w-40  rounded-md text-center uppercase px-2">
              carteira:{" "}
              <span>
                {String(
                  new Intl.NumberFormat("pt-BR", {
                    currency: "BRL",
                    style: "currency",
                  }).format(Number(dataUser?.wallet))
                )}
              </span>
            </p>

            <button className="bg-white p-1 w-32 rounded-md uppercase">
              meus produtos
            </button>
            <button className="bg-white p-1 w-24 rounded-md uppercase">
              comprados
            </button>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-white uppercase text-xl">{dataUser?.name}</p>
            <img src={`${process.env.NEXT_PUBLIC_URL}/${dataUser?.userIcon}` + ".jpg"}  />
            <DesligarIcon className="text-3xl hover:cursor-pointer " />
          </div>
        </div>
      </nav>
      <div></div>
    </>
  );
};

export default Home;
