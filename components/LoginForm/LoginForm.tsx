"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; // Zakładam standardowe Shadcn UI
import { FormProvider, useForm, Controller } from "react-hook-form";
import { UserLoginSchema, UserLoginSchemaType } from "@/zodSchema/loginUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context/auth";
import { useRouter } from "next/navigation";

const LoginForm = ({ className, ...props }: React.ComponentProps<"div">) => {
  const router = useRouter();
  const auth = useAuth();
  const method = useForm<UserLoginSchemaType>({
    resolver: zodResolver(UserLoginSchema),
    defaultValues: { email: "", password: "" },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = method;

  const onSubmit = async (data: UserLoginSchemaType) => {
    await auth?.loginWithEmail(data.email, data.password);
    router.push("/admin");
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden border-2 border-border shadow-xl">
        <CardContent className="grid p-0 ">
          <FormProvider {...method}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="p-8 lg:p-12 flex flex-col justify-center"
            >
              <div className="mb-8">
                <h1 className="text-3xl font-black tracking-tight uppercase italic">
                  PANEL LOGOWANIA
                </h1>
                <p className="text-muted-foreground text-sm mt-1">
                  Zaloguj się do panelu administratora.
                </p>
              </div>

              <div className="grid gap-5">
                <div className="grid gap-2">
                  <Label
                    htmlFor="email"
                    className="font-bold uppercase text-xs tracking-widest"
                  >
                    Email
                  </Label>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="email"
                        placeholder="admin@twojadomena.pl"
                        className="bg-accent/30 border-2 focus-visible:ring-primary h-12"
                      />
                    )}
                  />
                  {errors.email && (
                    <span className="text-destructive text-xs italic">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label
                      htmlFor="password"
                      className="font-bold uppercase text-xs tracking-widest"
                    >
                      Hasło
                    </Label>
                  </div>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="password"
                        type="password"
                        className="bg-accent/30 border-2 focus-visible:ring-primary h-12"
                      />
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-lg font-bold bg-primary text-primary-foreground hover:scale-[1.02] active:scale-95 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.05)]"
                >
                  ZALOGUJ SIĘ
                </Button>
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
