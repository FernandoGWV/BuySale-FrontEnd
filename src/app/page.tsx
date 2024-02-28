"use client";
import { UserContextAuth } from "@/context/userContext";
import { DesligarIcon, UserIcon } from "@/imgs";
import Image from "next/image";
import Link from "next/link";
import {
  DetailedHTMLProps,
  ImgHTMLAttributes,
  LegacyRef,
  useEffect,
  useRef,
  useState,
} from "react";
import "dotenv/config";
import ProductsList from "./components/Products";
import AllProducts from "./components/allProducts";
import SearchProducts from "./components/searchProducts";

const Home = () => {
  const { dataUser, isLoged, deslogar } = UserContextAuth();
  const [openProfile, setOpenProfile] = useState(false);
  const inputValue = useRef();
  const imgRef: any = useRef(null);
  const menuRef: any = useRef(null);
  useEffect(() => {
    console.log(dataUser);
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

    document.addEventListener("click", handleClickOutSide, true);
    return () => {
      document.removeEventListener("click", handleClickOutSide, true);
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
                    setOpenProfile(true);
                  }}
                  src={`${process.env.NEXT_PUBLIC_URL}/${dataUser?.userIcon}`}
                  alt="userIcon"
                  className="w-16  h-16 rounded-full cursor-pointer"
                />
                {openProfile && (
                  <div
                    className="bg-white absolute top-20 right-0"
                    ref={menuRef}
                  >
                    <ul className="p-3">
                      <li>
                        <Link href={"#"}>Ver Perfil</Link>
                      </li>
                      <li>
                        <Link href={"#"}>Editar Perfil</Link>
                      </li>
                      <li>
                        <Link href={"#"}>Criar um novo Produto</Link>
                      </li>
                    </ul>
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
      <section className="container mx-auto mt-10">
        <div>
          <div className="flex flex-col justify-center items-center relative">
            <SearchProducts />
          </div>
          <div className="mt-6 flex flex-wrap justify-start  w-full gap-5">
            <AllProducts />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
