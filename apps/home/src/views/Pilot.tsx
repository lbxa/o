import { Highlight, Input, TextArea, Title } from "@universe/atoms";

export const Pilot = () => {
  return (
    <div class="mb-xl">
      <Title>Early Users</Title>
      <p class="mb-md text-3xl">
        Join our community of early adopters in the{" "}
        <Highlight color="black">limited release</Highlight> and be among the
        first to experience oNex!
      </p>
      <p class="mb-md">
        Enjoy free access to the platform and help shape its future by sharing
        your feedback. Your insights will directly influence the features we
        develop, making sure they work perfectly for you. We're building this
        together!
      </p>
      <Input type="text" placeholder="Full name" />
      <Input type="email" placeholder="name@email.com" />
      <TextArea rows={4} />
      <button class="w-full rounded-lg bg-black p-sm px-md font-bold text-white">
        JOIN THE LIMITED RELEASE
      </button>
    </div>
  );
};
