export const Footer = () => {
  const date = new Date();
  return (
    <div class="rounded-t-3xl bg-indigo pt-md text-ivory lg:rounded-none">
      <div class="mb-md text-center">
        <p class="mb-sm">Get in touch with the founders</p>
        <a href="mailto:lucas@onex.social" class="mb-sm block underline">
          lucas@onex.social
        </a>
        <a href="mailto:jamie@onex.social" class="block underline">
          jamie@onex.social
        </a>
      </div>
      <div class="pb-md text-center">
        <span>oNex {date.getFullYear()}</span>
      </div>
    </div>
  );
};
