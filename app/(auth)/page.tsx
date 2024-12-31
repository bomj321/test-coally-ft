"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Checkbox } from "primereact/checkbox";
import { Password } from "primereact/password";
import { LoginValidation } from "@validations/LoginValidation";
import { Toast } from "primereact/toast";
import { showError } from "@lib/ToastMessages";
import { IZodError } from "@interfaces/IAuth";
import { VerifyErrorsInForms } from "@lib/VerifyErrorsInForms";
import { ValidationFlow } from "@lib/ValidationFlow";
import { HttpStatus } from "@enums/HttpStatusEnum";

const LoginPage = () => {
  const router = useRouter();
  const toast = useRef(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [saveMe, setSaveMe] = useState<boolean>(false);
  const [validations, setValidations] = useState<Array<IZodError>>([]);

  useEffect(() => {
    setEmail(
      localStorage.getItem("email") ? localStorage.getItem("email") : ""
    );
    setSaveMe(localStorage.getItem("saveMe") ? true : false);
  }, []);

  useEffect(() => {
    if (saveMe) {
      localStorage.setItem("email", email);
      localStorage.setItem("saveMe", "true");
    } else {
      localStorage.removeItem("email");
      localStorage.removeItem("saveMe");
    }
  }, [email, password, saveMe]);

  const handleLogin = async (e) => {
    e.preventDefault();
    //Validate data
    const validationFlow = ValidationFlow(
      LoginValidation({
        email,
        password,
      }),
      toast
    );

    // Show errors in inputs
    setValidations(validationFlow);
    if (validationFlow && validationFlow.length > 0) {
      return;
    }

    // Call the API
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    console.log("res", res);
    if (res.status === HttpStatus.OK) {
      router.push("/dashboard");
    } else if (res.status === HttpStatus.UNAUTHORIZED) {
      showError(toast, "", "Credenciales incorrectas.");
    } else {
      showError(toast, "", "Contacte con soporte.");
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <div className="flex h-screen justify-content-center">
        <form
          className="w-full lg:w-4 h-full text-center px-6 py-6 flex flex-column justify-content-between"
          onSubmit={handleLogin}
        >
          <div className="flex flex-column align-items-center gap-4">
            <div>
              <h2>¡Bienvenido!</h2>
            </div>

            <div>
              <InputText
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="text"
                className={`w-full ${
                  VerifyErrorsInForms(validations, "email") ? "p-invalid" : ""
                } `}
                placeholder="Correo"
              />

              <Password
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                id="password"
                type="password"
                className="mt-3"
                inputClassName={`w-full md:w-30rem ${
                  VerifyErrorsInForms(validations, "password")
                    ? "p-invalid"
                    : ""
                }`}
                placeholder="Contraseña"
                feedback={false}
                toggleMask
              />
            </div>

            <div className="w-full flex justify-content-start">
              <Checkbox
                inputId="saveMe"
                onChange={() => setSaveMe(!saveMe)}
                name="saveMe"
                value="true"
                checked={saveMe}
              />
              <label htmlFor="ingredient4" className="ml-2">
                Recuerdame
              </label>
            </div>

            <Button
              onClick={handleLogin}
              label="Ingresar"
              className="w-full"
            ></Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
