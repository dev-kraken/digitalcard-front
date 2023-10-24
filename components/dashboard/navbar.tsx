import MobileSidebar from "@/components/dashboard/mobile-sidebar";
import {AvatarProfile} from "@/components/dashboard/avatar";
import DashboardTitle from "@/components/dashboard/dashboard-title";
const Navbar = () => {
    return (
        <div className="flex items-center p-3 border-b">
            <MobileSidebar/>
            <div className="flex w-full justify-between">
                <DashboardTitle />
                <AvatarProfile/>
            </div>
        </div>
    )
}

export default Navbar;