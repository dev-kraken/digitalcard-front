"use client";
import {usePathname} from "next/navigation";

const DashboardTitle = () => {
    const pathname = usePathname();

    let finalTitle;
    switch (pathname) {
        case '/dashboard':
            finalTitle = 'Dashboard';
            break;
        case '/dashboard/cards':
            finalTitle = 'Cards';
            break;
        case '/qrcode':
            finalTitle = 'Qr Code';
            break;
        default:
            finalTitle = 'Dashboard';
    }
    return (
        <h3 className="text-2xl font-bold">{finalTitle}</h3>
    )
}

export default DashboardTitle;