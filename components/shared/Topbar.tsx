import { OrganizationSwitcher, SignOutButton, SignedIn } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { dark } from "@clerk/themes"

function Topbar() {
    return (
    <nav className="topbar">

        <Link href="/" className="flex items-center gap-4">
            <Image src="/logo-white-s.png" alt="Logo" width={32} height={32} />
            <p className="text-heading3-bold text-light-1 max-sx:hidden">Nuke</p>
        </Link>

        <div className="flex iteams-center gap-1">

        <OrganizationSwitcher 
            appearance={{
                baseTheme: dark,
                elements: {
                    organizationSwitcherTrigger:
                    "py-2 px-4"
                }
            }}
            />

        </div>

    </nav>
    )
}

export default Topbar