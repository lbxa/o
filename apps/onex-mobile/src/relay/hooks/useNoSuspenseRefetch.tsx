import { useCallback, useState } from "react";
import type { RefetchFnDynamic } from "react-relay";
import { useRelayEnvironment } from "react-relay";
import type { KeyType } from "react-relay/relay-hooks/helpers";
import type {
  GraphQLTaggedNode,
  OperationType,
  VariablesOf,
} from "relay-runtime";
import { fetchQuery } from "relay-runtime";

interface NoSuspenseRefetchProps<
  TAncestorQuery extends OperationType,
  TRefetchQuery extends OperationType,
  TRefetchKey extends KeyType | null | undefined,
> {
  ancestorQuery: GraphQLTaggedNode;
  ancestorVariables: VariablesOf<TAncestorQuery>;
  refetchFunc?: RefetchFnDynamic<TRefetchQuery, TRefetchKey>;
  refetchFuncVariables?: Partial<VariablesOf<TRefetchQuery>>;
}

/**
 * A hook that provides a refetch function that doesn't trigger Suspense boundaries.
 * Internally calls fetchQuery with a 'network-only' fetch policy on the ancestor query.
 *
 * @see https://relay.dev/docs/guided-tour/refetching/refreshing-fragments/#if-you-need-to-avoid-suspense
 *
 * @example
 * const { refetch: refetchTopResults, isRefetching: isRefetchingTopResults } =
 *   useNoSuspenseRefetch({
 *     ancestorQuery: CHALLENGE_ROOT_QUERY,
 *     ancestorVariables: { challengeId },
 *     refetch,
 *     refetchVariables: { count: 3 },
 *   });
 */
export const useNoSuspenseRefetch = <
  TAncestorQuery extends OperationType,
  TRefetchQuery extends OperationType,
  TRefetchKey extends KeyType | null | undefined,
>({
  ancestorQuery,
  ancestorVariables,
  refetchFunc,
  refetchFuncVariables = {},
}: NoSuspenseRefetchProps<TAncestorQuery, TRefetchQuery, TRefetchKey>): {
  refetch: () => void;
  isRefetching: boolean;
} => {
  const environment = useRelayEnvironment();
  const [isRefetching, setIsRefetching] = useState(false);

  /**
   * Retain data from the ancestor query in the relay store
   * so that it can be accessed by the refetch function
   *
   * @see https://github.com/relay-tools/react-relay-network-modern/issues/114#issuecomment-678464414
   */

  // const request = getRequest(ancestorQuery);
  // const operation = createOperationDescriptor(request, ancestorVariables);
  // const retainedOperation = environment.retain(operation);

  const refetch = useCallback(() => {
    if (isRefetching) {
      return;
    }
    setIsRefetching(true);

    const subscription = fetchQuery<TAncestorQuery>(
      environment,
      ancestorQuery,
      ancestorVariables,
      {
        fetchPolicy: "network-only",
      }
    ).subscribe({
      complete: () => {
        setIsRefetching(false);
        // TODO figure out why the 'store-only' fetch policy is not working
        // fetchQuery doesn't seem to be placing the items in the expected location
        refetchFunc?.(refetchFuncVariables, {
          fetchPolicy: "store-only",
          UNSTABLE_renderPolicy: "partial",
        });
      },
      error: () => {
        setIsRefetching(false);
      },
    });

    return () => {
      subscription.unsubscribe();
      // retainedOperation.dispose();
    };
  }, [
    ancestorQuery,
    ancestorVariables,
    environment,
    isRefetching,
    refetchFunc,
    refetchFuncVariables,
  ]);

  return {
    refetch,
    isRefetching,
  };
};
