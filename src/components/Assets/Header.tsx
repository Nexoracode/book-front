import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="fixed z-50 top-0 left-0 right-0 border-b bg-neutral-50 border-neutral-300 py-3">
      <div className="flex justify-center">
        <Link to={"/"}>
          <img src="/logo.png" width={70} height={70} />
        </Link>
      </div>
    </header>
  );
}
