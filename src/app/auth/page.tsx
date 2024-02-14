"use client";
import Button from "@/app/components/Button"
import { UserContextAuth } from "@/context/userContext";
import { useState } from "react";

const Login = () => {
  const [emailUser, setEmailUser] = useState("");
  const [passwordUser, setPasswordUser] = useState("");
  const { sessionCreate } = UserContextAuth();

  return (
    <>
      <section className=" container h-screen m-auto p-auto flex flex-col justify-center items-center">
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-lg uppercase ">Faça seu Login.</h1>
          <form action="" className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Email"
              className="w-80 p-2 rounded outline-none shadow-md border 
              border-gray-50 "
              onChange={({ target }) => setEmailUser(target.value)}
            />
            <input
              type="password"
              placeholder="Senha"
              onChange={({ target }) => setPasswordUser(target.value)}
              className="w-80 p-2 rounded outline-none shadow-md border 
              border-gray-50"
            />
            <Button
              text={"Entrar"}
              handleFunction={(e: any) => {
                e.preventDefault();
                sessionCreate(emailUser, passwordUser);
              }}
            />
          </form>

          <p>
            Não tem Conta?{" "}
            <a
              href="#"
              className="underline underline-offset-2 decoration-black hover:decoration-sky-400 hover:text-sky-400"
            >
              Criar Uma Conta.
            </a>
          </p>
        </div>
      </section>
    </>
  );
};

export default Login;
