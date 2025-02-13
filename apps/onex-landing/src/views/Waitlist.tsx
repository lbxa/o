import type { SubmitHandler } from "@modular-forms/solid";
import { createForm, FormError, zodForm } from "@modular-forms/solid";
import { Button, Highlight, TextInput } from "@universe/atoms";
import { createSignal } from "solid-js";
import { z } from "zod";

export const waitlistFormSchema = z.object({
  email: z
    .string()
    .min(1, "We'll need your email!")
    .email("Invalid email address"),
});
export type WaitlistForm = z.infer<typeof waitlistFormSchema>;

export const Waitlist = () => {
  const [waitlistForm, { Form, Field }] = createForm<WaitlistForm>({
    initialValues: { email: "" },
    validate: zodForm(waitlistFormSchema),
  });

  const [complete, setComplete] = createSignal(false);

  const handleSubmit: SubmitHandler<WaitlistForm> = async (values, _) => {
    try {
      const response = await fetch(import.meta.env.VITE_WAITLIST_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values }),
      });

      if (!response.ok) {
        throw new Error("Failed to add to waitlist program");
      }

      setComplete(true);
      return response.text();
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new FormError<WaitlistForm>(error.message);
      }
      throw new FormError<WaitlistForm>("An error has occurred.");
    }
  };

  return (
    <div class="mb-xl">
      <p class="mb-md text-3xl">
        Keen to <Highlight color="black">level up</Highlight> your fitness
        journey alongside our friends?
      </p>
      <p class="mb-md">
        Join our waitlist and you'll be notified as soon as we launch our
        general release!
      </p>
      <Form onSubmit={handleSubmit}>
        <Field name="email">
          {(field, props) => (
            <TextInput
              type="email"
              placeholder="name@email.com"
              error={field.error}
              {...props}
              required
            />
          )}
        </Field>
        <Button
          type="submit"
          checked={complete()}
          disabled={complete()}
          checkedText="THANK YOU"
          loading={waitlistForm.submitting}
        >
          JOIN THE WAITLIST
        </Button>
      </Form>
    </div>
  );
};
