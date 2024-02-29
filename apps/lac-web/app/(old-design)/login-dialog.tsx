"use client";

import FullscreenLoading from "@/old/_components/fullscreen-loading";
import { Checkbox } from "@/old/_components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/old/_components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/old/_components/ui/form";
import { Input } from "@/old/_components/ui/input";
import { Label } from "@/old/_components/ui/label";
import VisuallyHidden from "@/old/_components/visually-hidden";
import useAccountSelectorDialog from "@/old/_hooks/account/use-account-selector-dialog.hook";
import useLoginDialog from "@/old/_hooks/account/use-login-dialog.hook";
import useCookies from "@/old/_hooks/storage/use-cookies.hook";
import { api } from "@/old/_lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { JSEncrypt } from "jsencrypt";
import Link from "next/link";
import { useId } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
type LoginSchema = z.infer<typeof loginSchema>;

const LoginDialog = () => {
  const id = useId();
  const staySignedInId = `staySignedIn-${id}`;
  const open = useLoginDialog((state) => state.open);
  const setOpen = useLoginDialog((state) => state.setOpen);
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [, setCookies] = useCookies();
  const setAccountSelectorOpen = useAccountSelectorDialog(
    (state) => state.setOpen,
  );

  const loginMutation = useMutation({
    mutationFn: async (body: { userName: string; password: string }) => {
      return await api
        .post("am/auth/generate-token", {
          headers: {
            "Content-Type": "application/json",
          },
          json: body,
        })
        .json<{
          status_code: string;
          user_id: string;
          token: string;
          authentication: {
            authorities: {
              authority: string;
            }[];
            details: null;
            authenticated: boolean;
            principal: {
              password: null;
              username: string;
              authorities: {
                authority: string;
              }[];
              accountNonExpired: boolean;
              accountNonLocked: boolean;
              credentialsNonExpired: boolean;
              enabled: boolean;
            };
            credentials: null;
            name: string;
          };
        }>();
    },
    onSuccess: (data) => {
      setCookies("token", data.token, { path: "/" });

      setOpen(false);
      setAccountSelectorOpen(true);
    },
  });

  const onSubmit = (data: LoginSchema) => {
    const encryptedPassword = encryptString(data.password);
    const encryptedKey = `${encryptedPassword}:${data.email}`;
    const base64Key = Buffer.from(encryptedKey).toString("base64");

    loginMutation.mutate({ userName: data.email, password: base64Key });
  };

  if (loginMutation.isPending) {
    return <FullscreenLoading />;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="old-design-text-base max-w-[360px]">
        <DialogHeader>
          <DialogTitle>Sign In</DialogTitle>

          <VisuallyHidden>
            <DialogDescription>
              Sign into the site with your email and password
            </DialogDescription>
          </VisuallyHidden>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 px-8 pb-7"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <VisuallyHidden>
                    <FormLabel>Email</FormLabel>
                  </VisuallyHidden>
                  <FormControl>
                    <Input
                      placeholder="Email Address"
                      type="email"
                      required
                      {...field}
                    />
                  </FormControl>
                  <VisuallyHidden>
                    <FormDescription>Enter your email address</FormDescription>
                  </VisuallyHidden>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <VisuallyHidden>
                    <FormLabel>Password</FormLabel>
                  </VisuallyHidden>
                  <FormControl>
                    <Input
                      placeholder="Password"
                      type="password"
                      required
                      {...field}
                    />
                  </FormControl>
                  <VisuallyHidden>
                    <FormDescription>Enter your password</FormDescription>
                  </VisuallyHidden>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-row items-center justify-between gap-2">
              <div className="flex flex-row items-center gap-1">
                <Checkbox id={staySignedInId} />

                <Label htmlFor={staySignedInId}>Stay signed in</Label>
              </div>

              <button className="hover:text-brand-primary font-bold text-black">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="bg-brand-primary block h-9 w-full rounded-[3px] px-4 text-base font-normal uppercase text-white"
            >
              Sign in
            </button>

            <div className="text-brand-gray-500 text-center font-normal">
              Don&apos;t have an account?{" "}
              <DialogClose asChild>
                <Link href="/register" className="font-bold text-black">
                  Register
                </Link>
              </DialogClose>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;

const encryptString = (value: string) => {
  const RSAEncrypt = new JSEncrypt();
  if (process.env.NEXT_PUBLIC_WURTH_LAC_LOGIN_PUBLIC_KEY) {
    RSAEncrypt.setPublicKey(process.env.NEXT_PUBLIC_WURTH_LAC_LOGIN_PUBLIC_KEY);
  }

  return RSAEncrypt.encrypt(value);
};