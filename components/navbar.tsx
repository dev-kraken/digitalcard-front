import MobileSidebar from "@/components/mobile-sidebar";
import {AvatarProfile} from "@/components/avatar";
import DashboardTitle from "@/components/dashboard-title";
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