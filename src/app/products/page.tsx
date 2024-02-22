"use client";
import { UserContextAuth } from "@/context/userContext";
import Link from "next/link";
import { DesligarIcon, LikeIcon } from "@/imgs";
import { useEffect, useState } from "react";
import Api from "@/services/Api";
import Button from "../components/Button";
import { GrAddCircle } from "react-icons/gr";
import { GrEdit } from "react-icons/gr";
import ProductsList from "../components/Products";

const Products = () => {
  const { dataUser, deslogar, isLoged } = UserContextAuth();

  const [products, setProducts] = useState<[]>();

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
    if (products?.length === 0) {
      getProduct();
    }
  }, []);

  return (
    <>
      <div className="mb-7">
        <nav className="bg-myColor shadow-stone-500 shadow-md">
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
                  <p className="text-white uppercase text-xl">
                    {dataUser?.name}
                  </p>
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
        <section className="container md:2xl mx-auto">
          <div className="flex mt-6 justify-between items-center">
            <h1 className="uppercase border-b border-black w-fit ">
              meus produtos
            </h1>
            <div className="flex">
              <p className="mr-4">Adicionar</p>
              <Link href={"/products/register"}>
                <Button text={<GrAddCircle style={{ fontSize: 20 }} />} />
              </Link>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap justify-start  w-full gap-5">
            <ProductsList $active={true} />
          </div>
        </section>
      </div>
    </>
  );
};

export default Products;
