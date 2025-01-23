import type { SetStoreFunction } from "solid-js/store";
import { createStore } from "solid-js/store";

type Validator = (
  element: HTMLInputElement
) => string | null | Promise<string | null>;

interface FieldConfig {
  element: HTMLInputElement;
  validators: Validator[];
}

interface UseFormOptions {
  errorClass?: string;
}

type FormErrorStore = Record<string, string | undefined>;

interface FormAPI {
  validate: (
    ref: HTMLInputElement,
    accessor: () => Validator | Validator[]
  ) => void;
  formSubmit: (
    ref: HTMLFormElement,
    accessor: () => (form: HTMLFormElement) => void
  ) => void;
  errors: Record<string, string | undefined>;
}

function checkValid(
  { element, validators = [] }: FieldConfig,
  setErrors: SetStoreFunction<FormErrorStore>,
  errorClass?: string
) {
  return async () => {
    element.setCustomValidity("");
    element.checkValidity();
    let message = element.validationMessage;
    if (!message) {
      for (const validator of validators) {
        const text = await validator(element);
        if (text) {
          element.setCustomValidity(text);
          break;
        }
      }
      message = element.validationMessage;
    }
    if (message) {
      errorClass && element.classList.toggle(errorClass, true);
      setErrors({ [element.name]: message });
    }
  };
}

export function useForm({ errorClass }: UseFormOptions): FormAPI {
  const [errors, setErrors] = createStore<FormErrorStore>({});

  const fields: Record<string, FieldConfig> = {};

  const validate = (
    ref: HTMLInputElement,
    accessor: () => Validator | Validator[]
  ) => {
    const accessorValue = accessor();
    const validators = Array.isArray(accessorValue)
      ? accessorValue
      : [accessorValue];
    let config: FieldConfig;
    fields[ref.name] = config = { element: ref, validators };
    ref.onblur = checkValid(config, setErrors, errorClass);
    ref.oninput = () => {
      if (!errors[ref.name]) return;
      setErrors({ [ref.name]: undefined });
      errorClass && ref.classList.toggle(errorClass, false);
    };
  };

  const formSubmit = (
    ref: HTMLFormElement,
    accessor: () => (form: HTMLFormElement) => void
  ) => {
    const callback = accessor();
    ref.setAttribute("novalidate", "");
    ref.onsubmit = async (e) => {
      e.preventDefault();
      let errored = false;

      for (const k in fields) {
        const field = fields[k];
        if (field) {
          await checkValid(field, setErrors, errorClass)();
          if (!errored && field.element.validationMessage) {
            field.element.focus();
            errored = true;
          }
        }
      }
      if (!errored) {
        callback(ref);
      }
    };
  };

  return { validate, formSubmit, errors };
}
