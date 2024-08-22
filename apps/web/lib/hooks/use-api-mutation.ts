import { useMutation } from "convex/react";
import { FunctionReference, OptionalRestArgs } from "convex/server";
import { useState } from "react";

export default function useApiMutation<
  Mutation extends FunctionReference<"mutation">,
>(mutateFunction: Mutation) {
  const [isPending, setIsPending] = useState(false);
  const apiMutation = useMutation(mutateFunction);

  const mutate = async (...payload: OptionalRestArgs<Mutation>) => {
    setIsPending(true);
    return apiMutation(...payload)
      .then((res) => res)
      .catch((err) => {
        throw err;
      })
      .finally(() => {
        setIsPending(false);
      });
  };

  return { isPending, mutate };
}
