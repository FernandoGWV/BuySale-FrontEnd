"use client";

import { UserContextAuth } from "@/context/userContext";
import Api from "@/services/Api";
import { useEffect, useState } from "react";
import Button from "./Button";
import { GrEdit } from "react-icons/gr";
import { LikeIcon } from "@/imgs";
import React, { Dispatch, SetStateAction } from "react";
import Link from "next/link";

type IProps = {
  $active?: boolean;
  setModalActive?: Dispatch<SetStateAction<boolean>>;
  setGetOnlyProduct?: any;
};

const ProductsList = (props: IProps) => {
  const { dataUser } = UserContextAuth();
  const [userProducts, setUserProducts] = useState<[] | any>();
  useEffect(() => {
    const getProduct = async () => {
      try {
        const { data } = await Api.get("/products");
        const filteredProducts = data.data.filter(
          (item: any) => item.id_user === dataUser?.id
        );
        setUserProducts(filteredProducts);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    if (dataUser?.id) {
      getProduct();
    }
  }, [dataUser?.id]);

  useEffect(() => {
    console.log("PRODUTOS DO USUARIO", userProducts);
  }, [userProducts]);

  return (
    <>
      {userProducts?.map((item: IProduct) => {
        return (
          <>
            <div className="flex  flex-col gap-10  shadow-md w-56  max-h-96 rounded-lg items-center ">
              <div className="mb-2  w-52 flex flex-col justify-center items-start">
                <div className="flex w-full  mt-1 items-center justify-between">
                  <h1 className="uppercase border-b-2 border-myColor ">
                    {item.title}
                  </h1>
                  {props.$active ? (
                    <Button
                      handleFunction={() => {
                        props.setGetOnlyProduct({
                          id: item.id,
                          title: item.title,
                          img: item.images[0],
                          descripte: item.descripte,
                          price: item.price,
                        });
                        if (props.setModalActive) {
                          props.setModalActive(true);
                        }
                      }}
                      text={<GrEdit fontSize={16} />}
                    />
                  ) : null}
                </div>
                <Link href={`/product/${item.id}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${process.env.NEXT_PUBLIC_URL}/${item?.images[0].path_image}`}
                    alt="imageProduct"
                    className="mt-3 mx-auto rounded-lg w-52 h-52"
                  />
                </Link>
                <div className="bg-myColor rounded-lg mt-2 flex items-center justify-between relative  my-0 w-full">
                  <span
                    className=" text-neutral-300 py-2 px-2  "
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

export default ProductsList;
