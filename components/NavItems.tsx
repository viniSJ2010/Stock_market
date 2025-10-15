'use client'

import {NAV_ITEMs} from "@/lib/constants";
import {usePathname} from "next/navigation";
import Link from "next/link"; // Adição: Importação do componente Link

const NavItems = () => {
    const pathname = usePathname()
    const isActive = (path: string) => {
        if (path === '/') return pathname === '/';
        return pathname.startsWith(path);
    }

    return (
        <ul className="flex flex-col sm:flex-row p-2 gap-3 sm:gap-10 font-medium">
            {NAV_ITEMs.map(     ({ href, label }) => (
                <li key={href}>
                    {/* Uso Correto: Componente Link (L maiúsculo) */}
                    <Link href={href} className={`hover:text-yellow-600 transition-colors ${
                        isActive( href) ? 'text-gray-100' : ''
                    }`}>
                        {label}
                    </Link>
                </li>
            ))}
        </ul>
    )
}
export default NavItems