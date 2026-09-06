export default function Logo({ className = "w-9 h-9" }) {
  return (
    <img
      src="/profileiq-logo.png"
      alt="ProfileIQ logo"
      className={`${className} rounded-full object-cover`}
    />
  );
}