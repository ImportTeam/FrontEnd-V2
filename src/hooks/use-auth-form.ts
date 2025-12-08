/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import type { DefaultValues, FieldValues, UseFormReturn } from "react-hook-form";
import type { z } from "zod";

interface UseAuthFormProps<T extends FieldValues> {
  schema: z.ZodType<T, any, any>;
  defaultValues: DefaultValues<T>;
}

export function useAuthForm<T extends FieldValues>({
  schema,
  defaultValues,
}: UseAuthFormProps<T>): UseFormReturn<T> {
  return useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onChange",
  });
}
