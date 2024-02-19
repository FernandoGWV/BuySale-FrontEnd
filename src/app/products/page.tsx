"use client";
import { UserContextAuth } from "@/context/userContext";
import Link from "next/link";
import { DesligarIcon } from "@/imgs";
import { useEffect, useState } from "react";
import Api from "@/services/Api";
const Products = () => {
  const { dataUser, deslogar, isLoged } = UserContextAuth();

  const [products, setProducts] = useState<[]>();
  useEffect(() => {
    getProduct();
  }, []);
  const getProduct = async () => {
    try {
      const result = await Api.get("/products").then((dados) => {
        const filteredProducts = dados.data.data.filter(
          (item: any) => item.id_user === dataUser?.id
        );
        setProducts(filteredProducts);
        console.log(dados, "DADOS");
      });
    } catch (error) {}
  };

  useEffect(() => {
    console.log(products, "PRODUTOS FILTERED");
  }, [products]);
  return (
    <>
      <nav className="bg-myColor">
        <div className=" container mx-auto  flex item-center justify-between h-20 ">
          <div className="  flex items-center gap-5">
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
            <Link href={"/"}>
              <button className="bg-white p-1 w-32 rounded-md uppercase">
                HOME
              </button>
            </Link>
            <button className="bg-white p-1 w-24 rounded-md uppercase">
              comprados
            </button>
          </div>
          <div className="flex items-center gap-4">
            {isLoged ? (
              <>
                <p className="text-white uppercase text-xl">{dataUser?.name}</p>
                <img
                  src={`${process.env.NEXT_PUBLIC_URL}/${dataUser?.userIcon}`}
                  alt="userIcon"
                  className="w-16  h-16 rounded-full"
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
                    logar / registrar-se
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <section className="container mx-auto">
        <div>
          <h1 className="uppercase border-b border-black w-fit mt-6">
            meus produtos
          </h1>
        </div>
      </section>
    </>
  );
};

export default Products;
