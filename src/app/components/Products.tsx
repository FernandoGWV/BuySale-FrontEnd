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
  const { dataUser, deslogar, isLoged } = UserContextAuth();
  const [userProducts, setUserProducts] = useState<[]>();
  const [getOnlyProduct, setGetOnlyProduct] = useState({});
  const getProduct = async () => {
    try {
      const result = await Api.get("/products").then((dados) => {
        const filteredProducts = dados.data.data.filter(
          (item: any) => item.id_user === dataUser?.id
        );
        setUserProducts(filteredProducts);
      });
    } catch (error) {}
  };

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    getProduct();
  }, [dataUser]);

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
                <div className="mt-2 flex items-center justify-between relative  my-0 w-full">
                  <span
                    className="bg-myColor text-neutral-300 p-1 px-2  rounded-lg"
                    style={{ fontSize: 15 }}
                  >
                    {String(
                      new Intl.NumberFormat("pt-BR", {
                        currency: "BRL",
                        style: "currency",
                      }).format(Number(item?.price))
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
    </>
  );
};

export default ProductsList;
