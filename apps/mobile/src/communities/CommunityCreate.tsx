import { PrimaryButton, PrimaryTextInputControl } from "@universe/atoms";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { graphql, useMutation } from "react-relay";
import type {
  CommunityCreateInput,
  CommunityCreateMutation,
} from "src/__generated__/CommunityCreateMutation.graphql";

export const COMMUNITY_CREATE_MUTATION = graphql`
  mutation CommunityCreateMutation(
    $communityCreateInput: CommunityCreateInput!
  ) {
    communityCreate(communityCreateInput: $communityCreateInput) {
      name
    }
  }
`;

export const CommunityCreate = () => {
  const [commitMutation, isMutationInFlight] =
    useMutation<CommunityCreateMutation>(COMMUNITY_CREATE_MUTATION);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CommunityCreateInput>({
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (data: CommunityCreateInput) => {
    const { name } = data;
    commitMutation({
      variables: {
        communityCreateInput: {
          name,
        },
      },
      onError: (error) => {
        console.error(error.message);
      },
    });
  };

  return (
    <View>
      <Controller
        name="name"
        control={control}
        rules={{ required: { value: true, message: "Required field" } }}
        render={({ field: { onBlur, onChange, value } }) => (
          <PrimaryTextInputControl
            className="mb-md"
            placeholder="Community name"
            inputMode="text"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors.name}
            errorMessage={errors.name?.message}
          />
        )}
      />
      <PrimaryButton
        title={isMutationInFlight ? "Loading..." : "Create"}
        disabled={isMutationInFlight}
        onPress={async (e) => {
          // Read more about event pooling
          // https://legacy.reactjs.org/docs/legacy-event-pooling.html
          e.persist();
          await handleSubmit(onSubmit)();
        }}
      />
    </View>
  );
};
