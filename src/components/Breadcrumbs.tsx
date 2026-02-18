import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  light?: boolean;
}

export default function Breadcrumbs({ items, light }: BreadcrumbsProps) {
  return (
    <nav className="mb-6" aria-label="Breadcrumb">
      <ol className={`flex items-center space-x-2 text-sm ${light ? 'text-white/70' : 'text-gray-500'}`}>
        <li>
          <Link href="/" className={light ? 'hover:text-white' : 'hover:text-primary'}>
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center space-x-2">
            <span>/</span>
            {item.href ? (
              <Link href={item.href} className={light ? 'hover:text-white' : 'hover:text-primary'}>
                {item.label}
              </Link>
            ) : (
              <span className={light ? 'text-white' : 'text-gray-900'}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
