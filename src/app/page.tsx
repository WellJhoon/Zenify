import Link from "next/link";

export default function Home() {
  let href = "/chat";

  return (
    <div className="landing-container w-screen h-screen">
      <div className="container">
        <p className="letter">Zenify</p>
        <div className="moon">
          <div className="orbit">
            <p>O</p>
          </div>
        </div>
        <div className="button">
          <Link href={href}>
            <button className="bg-blue-950 px-8 py-1 shadow-2xl shadow-blue-800 rounded-xl text-2xl hover:bg-blue-900">
              Iniciar
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
