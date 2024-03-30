"use client";

import { UserContextAuth } from "@/context/userContext";
import Api from "@/services/Api";
import { useEffect, useState } from "react";
import Button from "./Button";
import { GrEdit } from "react-icons/gr";
import { LikeIcon } from "@/imgs";
import Link from "next/link";

type IProps = {
  $active?: boolean;
};

const AllProducts = (props: IProps) => {
  const { dataUser, deslogar, isLoged } = UserContextAuth();
  const [allProducts, setAllProducts] = useState<[]>();
  const getProduct = async () => {
    try {
      const resultAll = await Api.get("/products").then((dados) => {
        if (dados.data.data) {
          const productsData = dados.data.data;
          const randomItens = productsData.sort(() => Math.random() - 0.5);
          const arraySLice = randomItens.slice(
            0,
            Math.min(15, randomItens.lenght)
          );
          setAllProducts(randomItens);
        }
      });
    } catch (error) {}
  };
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      {allProducts?.map((item: IProduct) => {
        return (
          <>
            <div className="flex flex-col gap-10  shadow-md w-56  max-h-96 rounded-lg items-center ">
              <div className="mb-2 w-52 flex flex-col justify-center items-start">
                <div className="flex w-full  mt-1 items-center justify-between">
                  <h1 className="uppercase border-b-2 border-myColor ">
                    {item.title}
                  </h1>
                  {props.$active ? (
                    <Button text={<GrEdit fontSize={16} />} />
                  ) : null}
                </div>
                <Link href={`/product/${item.id}`}>
                  <img
                    src={`${process.env.NEXT_PUBLIC_URL}/${item?.images[0].path_image}`}
                    alt="imageProduct"
                    className="mt-3 mx-auto rounded-lg w-52 h-52"
                  />
                </Link>
                <div className=" bg-myColor rounded-lg mt-2 flex items-center justify-center relative  my-0 w-full">
                  <span
                    className="text-neutral-300 py-2 px-2"
                    style={{ fontSize: 15 }}
                  >
                    {String(
                      new Intl.NumberFormat("pt-BR", {
                        currency: "BRL",
                        style: "currency",
                      }).format(Number(item?.price))
                    )}
                  </span>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};

export default AllProducts;
