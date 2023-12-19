import Link from 'next/link';

const links = [
  {
    href: '/chat',
    label: 'Chat',
  },
  {
    href: '/tours',
    label: 'Tours',
  },
  {
    href: '/tours/new-tour',
    label: 'New Tour',
  },
  {
    href: '/profile',
    label: 'Profile',
  },
];
const NavLinks = () => {
  return (
    <ul className="menu text-base-content">
      {links.map(({ href, label }) => {
        return (
          <Link href={href} key={href} className="menu-title">
            {label}
          </Link>
        );
      })}
    </ul>
  );
};
export default NavLinks;
