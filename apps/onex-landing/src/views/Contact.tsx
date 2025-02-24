import type { SubmitHandler } from "@modular-forms/solid";
import { createForm, FormError, zodForm } from "@modular-forms/solid";
import { Button, Highlight, TextAreaInput, TextInput } from "@universe/atoms";
import { createSignal } from "solid-js";
import { z } from "zod";

export const contactFormSchema = z.object({
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

export type ContactForm = z.infer<typeof contactFormSchema>;

export const Contact = () => {
  const [contactForm, { Form, Field }] = createForm<ContactForm>({
    initialValues: { fullName: "", email: "", message: "" },
    validate: zodForm(contactFormSchema),
  });

  const [complete, setComplete] = createSignal(false);

  const handleSubmit: SubmitHandler<ContactForm> = async (values, _) => {
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
        throw new FormError<ContactForm>(error.message);
      }
      throw new FormError<ContactForm>("An error has occurred.");
    }
  };

  return (
    <div class="mb-xl">
      <p class="mb-md text-3xl">
        Help us shape the{" "}
        <Highlight color="black">future of fitness.</Highlight>
      </p>
      <p class="mb-md">Get in touch with us and share your feedback!</p>
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
          {(_, props) => <TextAreaInput rows={4} {...props} required />}
        </Field>
        <Button
          type="submit"
          checked={complete()}
          disabled={complete()}
          checkedText="THANK YOU"
          loading={contactForm.submitting}
        >
          SEND
        </Button>
      </Form>
    </div>
  );
};
