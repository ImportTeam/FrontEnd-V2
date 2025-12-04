import { useForm, UseFormReturn, FieldValues, DefaultValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodSchema } from "zod";

interface UseAuthFormProps<T extends FieldValues> {
  schema: any;
  defaultValues: DefaultValues<T>;
}

export function useAuthForm<T extends FieldValues>({
  schema,
  defaultValues,
}: UseAuthFormProps<T>): UseFormReturn<T> {
  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onChange", // Validate on change for better UX
  });

  return form;
}
