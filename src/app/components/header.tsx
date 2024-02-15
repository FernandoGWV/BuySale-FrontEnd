"use client";
import { UserContextAuth } from "@/context/userContext";
import { DesligarIcon, UserIcon } from "@/imgs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
const Header = ({ btn_1, btn_2, btn_3, btn_wallet }: any) => {
  const { dataUser, isLoged, deslogar } = UserContextAuth();
  useEffect(() => {}, []);
  return (
    <>
      <nav className="bg-myColor">
        <div className=" container mx-auto  flex item-center justify-between h-20 ">
          <div className="  flex items-center gap-5">
            {btn_wallet ? (
              <p className="bg-white p-1 max-w-40  rounded-md text-center uppercase px-2">
                {btn_wallet}
              </p>
            ) : (
              <p className="bg-white p-1 max-w-40  rounded-md text-center uppercase px-2">
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
            )}

            <button className="bg-white p-1 w-32 rounded-md uppercase">
              {btn_1}
            </button>
            <button className="bg-white p-1 w-24 rounded-md uppercase">
              {btn_2}
            </button>
          </div>
          <div className="flex items-center gap-4">
            {isLoged ? (
              <>
                <p className="text-white uppercase text-xl">{dataUser?.name}</p>
                <img
                  src={
                    `${process.env.NEXT_PUBLIC_URL}/${dataUser?.userIcon}` +
                    ".jpg"
                  }
                />
                <DesligarIcon
                  className="text-3xl hover:cursor-pointer"
                  onClick={() => deslogar()}
                />{" "}
              </>
            ) : (
              <>
                <Link href={"/auth"}>
                  <button className="bg-white p-1 w-44 rounded-md uppercase">
                    {btn_3}
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
