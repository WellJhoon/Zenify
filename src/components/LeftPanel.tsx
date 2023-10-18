import ProfileCard from "./ProfileCard";
import LogoutButton from "./LogoutButton";
import Link from "next/link";

const LeftPanel = () => {

  const menu = [
    {
      name: 'Posts',
      url: 'post'
    },
    {
      name: 'Focus Mode',
      url: 'focus'
    },    
    {
      name: 'Professionals',
      url: 'professionals'
    },
    {
      name: 'Settings',
      url: 'settings'
    },
  ]

  return (
    <aside className="w-[253px] py-[25px] px-[20px] flex-col justify-between self-stretch flex-shrink-0 bg-zinc-50 rounded-xl">
      <ProfileCard/>
      <div>
        {menu.map((item) => (
          <Link key={item.url} href={`/dashboard/${item.url}`}>
          <button className="my-2 w-full rounded-lg p-2 text-left text-lg font-medium hover:bg-blue-100">
            {item.name}
          </button>
        </Link>
        ))}
      </div>
      <LogoutButton/>
    </aside>
  );
};

export default LeftPanel;
