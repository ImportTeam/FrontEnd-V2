import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "이메일을 입력해주세요." })
    .email({ message: "올바른 이메일 형식이 아닙니다." }),
  password: z
    .string()
    .min(1, { message: "비밀번호를 입력해주세요." })
    .min(6, { message: "비밀번호는 최소 6자 이상이어야 합니다." }),
});

export const signupSchema = z.object({
  name: z
    .string()
    .min(1, { message: "이름을 입력해주세요." })
    .min(2, { message: "이름은 최소 2자 이상이어야 합니다." }),
  email: z
    .string()
    .min(1, { message: "이메일을 입력해주세요." })
    .email({ message: "올바른 이메일 형식이 아닙니다." }),
  password: z
    .string()
    .min(1, { message: "비밀번호를 입력해주세요." })
    .min(8, { message: "비밀번호는 최소 8자 이상이어야 합니다." })
    .regex(/[a-zA-Z]/, { message: "영문자를 포함해야 합니다." })
    .regex(/[0-9]/, { message: "숫자를 포함해야 합니다." })
    .regex(/[^a-zA-Z0-9]/, { message: "특수문자를 포함해야 합니다." }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type SignupSchema = z.infer<typeof signupSchema>;
