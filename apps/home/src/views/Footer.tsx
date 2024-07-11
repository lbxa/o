export const Footer = () => {
  const date = new Date();
  return (
    <div>
      <div class="mb-md text-center">
        Get in touch with the founders
        <a href="mailto:lucas@onex.social" class="block underline">
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
