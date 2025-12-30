import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import type { DefaultValues, FieldValues, Resolver, UseFormReturn } from "react-hook-form";
import type { z } from "zod";

type FormSchema = z.ZodTypeAny;
type FormValues<Schema extends FormSchema> = z.infer<Schema> & FieldValues;

interface UseAuthFormProps<Schema extends FormSchema> {
  schema: Schema;
  defaultValues: DefaultValues<FormValues<Schema>>;
}

export function useAuthForm<Schema extends FormSchema>({
  schema,
  defaultValues,
}: UseAuthFormProps<Schema>): UseFormReturn<FormValues<Schema>> {
  const resolver = zodResolver(schema as never) as Resolver<FormValues<Schema>>;

  return useForm<FormValues<Schema>>({
    resolver,
    defaultValues,
    mode: "onChange",
    reValidateMode: "onChange",
  });
}
