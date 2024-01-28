import VisuallyHidden from "@/_components/visually-hidden";
import useAccountSelectorDialog from "@/_hooks/account/use-account-selector-dialog.hook";
import useCookies from "@/_hooks/storage/use-cookies.hook";
import { api } from "@/_lib/api";
import { encryptString } from "@/_utils/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Dialog from "@radix-ui/react-dialog";
import * as Form from "@radix-ui/react-form";
import * as Label from "@radix-ui/react-label";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCheck } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import * as z from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
type LoginSchema = z.infer<typeof loginSchema>;
type LoginFieldName = keyof LoginSchema;

const Login = () => {
  const id = useId();
  const staySignedInId = `signIn-${id}`;
  const [dialogOpen, setDialogOpen] = useState(false);
  const { register, handleSubmit } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
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
          body: JSON.stringify(body),
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
      setCookies("token", data.token);

      setDialogOpen(false);
      setAccountSelectorOpen(true);
    },
  });

  const onSubmit = (data: LoginSchema) => {
    const encryptedPassword = encryptString(data.password);
    const encryptedKey = `${encryptedPassword}:${data.email}`;
    const base64Key = Buffer.from(encryptedKey).toString("base64");

    loginMutation.mutate({ userName: data.email, password: base64Key });
  };

  return (
    <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
      <Dialog.Trigger asChild>
        <button className="bg-brand-primary text-white">Sign in</button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60" />

        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white">
          <Dialog.Title>Sign In</Dialog.Title>

          <VisuallyHidden>
            <Dialog.Description>
              Sign into the site with your email and password
            </Dialog.Description>
          </VisuallyHidden>

          <Form.Root onSubmit={handleSubmit(onSubmit)}>
            <Form.Field name={"email" satisfies LoginFieldName}>
              <VisuallyHidden>
                <Form.Label>Email</Form.Label>
              </VisuallyHidden>

              <Form.Control asChild>
                <input
                  {...register("email")}
                  type="email"
                  required
                  placeholder="Email Address"
                />
              </Form.Control>
            </Form.Field>

            <Form.Field name={"password" satisfies LoginFieldName}>
              <VisuallyHidden>
                <Form.Label>Email</Form.Label>
              </VisuallyHidden>

              <Form.Control asChild>
                <input
                  {...register("password")}
                  type="password"
                  required
                  placeholder="Password"
                />
              </Form.Control>
            </Form.Field>

            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center gap-2">
                <Checkbox.Root
                  className="data-[state=checked]:bg-brand-secondary data-[state=checked]:border-brand-secondary grid h-[25px] w-[25px] place-items-center border border-black"
                  id={staySignedInId}
                >
                  <Checkbox.Indicator className="text-white">
                    <FaCheck />
                  </Checkbox.Indicator>
                </Checkbox.Root>

                <Label.Root htmlFor={staySignedInId}>Stay signed in</Label.Root>
              </div>

              <Dialog.Close asChild>
                <button>Forgot password?</button>
              </Dialog.Close>
            </div>

            <Form.Submit asChild>
              <button className="bg-brand-primary p-2 uppercase text-white">
                Sign In
              </button>
            </Form.Submit>
          </Form.Root>

          <div>
            Don&apos;t have an account?{" "}
            <Dialog.Close asChild>
              <Link href="/register">Register</Link>
            </Dialog.Close>
          </div>

          <Dialog.Close asChild>
            <button className="absolute right-2 top-2" aria-label="Close">
              <MdOutlineClose />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Login;
