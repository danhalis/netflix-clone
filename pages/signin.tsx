import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Loading from "../components/Loading";
import useAuth from "../hooks/AuthHook";

interface Inputs {
  email: string;
  password: string;
}

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [submit, setSubmit] = useState(false);

  const { logIn, authenticating } = useAuth();
  const [signInSuccess, setSignInSuccess] = useState(false);

  // If the login process is happening
  // or if the user has logged in but the browser is still redirecting
  if (authenticating || signInSuccess) return <Loading />;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!submit) return;
    // Sign in and return success state
    setSignInSuccess(await logIn(data.email, data.password));
    setSubmit(false);
  };

  const router = useRouter();
  const onSignUp = () => {
    router.push("/signup");
  };

  return (
    <div
      className="
        relative
        flex flex-col
        h-screen w-screen
        bg-black
        md:justify-center md:items-center md:bg-transparent
      "
    >
      <Head>
        <title>Netflix - Sign In</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Background Image */}
      <Image
        src="https://rb.gy/p2hphi"
        alt=""
        className="
					-z-10
					opacity-60
					object-cover
					!hidden
					sm:!inline
				"
        fill
      />

      {/* Netflix Logo */}
      <img
        src="http://rb.gy/ulxxee"
        width={100}
        height={100}
        className="
					absolute top-4 left-4
					cursor-pointer object-contain
					md:top-6 md:left-10
				"
      />

      {/* Sign In Form */}
      <form
        className="
					relative
					space-y-8
					mt-24
					px-6 py-10
					rounded
					bg-black/75
					md:mt-0
					md:px-14
					md:max-w-md
				"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-4xl font-semibold">Sign In</h1>
        <div className="space-y-4">
          {/* Email Input */}
          <label className="inline-block w-full">
            <input
              className="input"
              type="email"
              placeholder="Email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p
                className="
								p-1
								text-[13px] text-orange-500 font-light
							"
              >
                Please enter an email
              </p>
            )}
          </label>
          {/* Password Input */}
          <label className="inline-block w-full">
            <input
              className="input"
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p
                className="
								p-1
								text-[13px] text-orange-500 font-light
							"
              >
                Please enter a password
              </p>
            )}
          </label>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="
						w-full
						py-3
						font-semibold
						rounded
						bg-[#e50914]
					"
          onClick={() => setSubmit(true)}
        >
          Sign In
        </button>

        {/* Sign Up redirect */}
        <div className="text-[gray]">
          New to Netflix?{" "}
          <div
            className="
            inline-block
          text-white
            cursor-pointer
            hover:underline
          "
            onClick={onSignUp}
          >
            Sign up now
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
