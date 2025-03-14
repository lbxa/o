import type { SubmitHandler } from "@modular-forms/solid";
import { createForm, FormError, zodForm } from "@modular-forms/solid";
import { Button, Highlight, TextAreaInput, TextInput } from "@universe/atoms";
import { createSignal } from "solid-js";
import { z } from "zod";

export const pilotFormSchema = z.object({
  fullName: z
    .string()
    .min(1, "What should we call you?")
    .max(100, "Full name must be less than 100 characters"),
  email: z
    .string()
    .min(1, "We'll need your email!")
    .email("Invalid email address"),
  message: z.string().max(500, "Message must be less than 500 characters"),
});

export type PilotForm = z.infer<typeof pilotFormSchema>;

export const Pilot = () => {
  const [loginForm, { Form, Field }] = createForm<PilotForm>({
    initialValues: { fullName: "", email: "", message: "" },
    validate: zodForm(pilotFormSchema),
  });

  const [complete, setComplete] = createSignal(false);

  const handleSubmit: SubmitHandler<PilotForm> = async (values, _) => {
    try {
      const response = await fetch(import.meta.env.VITE_PILOT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values }),
      });

      if (!response.ok) {
        throw new Error("Failed to add to pilot program");
      }

      setComplete(true);
      return response.text();
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new FormError<PilotForm>(error.message);
      }
      throw new FormError<PilotForm>("An error has occurred.");
    }
  };

  return (
    <div class="mb-xl">
      <p class="mb-md text-3xl">
        We're tackling a common issue in the fitness industry,{" "}
        <Highlight color="black">high churn rates</Highlight>.
      </p>
      <p class="mb-md">
        Research shows that approximately 50% of gym members quit within the
        first six months, often due to a lack of community and motivation. oNex
        helps overcome this be by creating a community platform that builds
        engagement and connection.
      </p>
      <p class="mb-md">
        With tailored fitness challenges, social channels, gamification, and
        accountability tools like leaderboards, events, and progress tracking,
        we're keeping members motivated and committed to their fitness goal,
        creating a nexus your members never want to leave.
      </p>

      <p class="mb-md text-3xl">
        Join our community of early adopters in the{" "}
        <Highlight color="black">limited release.</Highlight>
      </p>
      <p class="mb-md">
        Enjoy free access to the platform and help shape its future by sharing
        your feedback. Let's build the future of fitness together!
      </p>
      <Form onSubmit={handleSubmit}>
        <Field name="fullName">
          {(field, props) => (
            <TextInput
              type="text"
              placeholder="Full name"
              error={field.error}
              {...props}
              required
            />
          )}
        </Field>
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
        <Field name="message">
          {(_, props) => <TextAreaInput rows={4} {...props} />}
        </Field>
        <Button
          type="submit"
          checked={complete()}
          disabled={complete()}
          checkedText="THANK YOU"
          loading={loginForm.submitting}
        >
          JOIN THE LIMITED RELEASE
        </Button>
      </Form>
    </div>
  );
};
