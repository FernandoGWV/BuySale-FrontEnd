"use client";
import Button from "@/app/components/Button";
import { UserContextAuth } from "@/context/userContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GoArrowLeft } from "react-icons/go";





const Login = () => {
  const [emailUser, setEmailUser] = useState("");
  const [passwordUser, setPasswordUser] = useState("");
  const { sessionCreate } = UserContextAuth();
  const router = useRouter();

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

           { emailUser && passwordUser ? 
              <Button
              text={"Entrar"}
              handleFunction={(e: any) => {
                e.preventDefault();
                sessionCreate(emailUser, passwordUser);
              }}
            />
          
             : 
              <button disabled={true} className={`text-red-50 max-w-40 p-1 rounded bg-myColor opacity-45 uppercase`}>Entrar</button> 
          }
          </form>

          <p>
            Não tem Conta?{" "}
            <a
              href="/auth/register"
              className="underline underline-offset-2 decoration-black hover:decoration-sky-400 hover:text-sky-400"
            >
              Criar Uma Conta.
            </a>
          </p>
        </div>
        <button
          className="bg-myColor p-1 max-w-40 text-white rounded-md text-center uppercase px-2 mt-5"
          onClick={() => router.push("/")}
        >
          <GoArrowLeft />
        </button>
      </section>
    </>
  );
};

export default Login;
