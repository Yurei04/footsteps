import { ArrowRight } from "lucide-react"
import { Button } from "../ui/button"


interface MapRefreshProps {
    refresh: boolean
}

export default function MapRefresh (/*{ refresh }: MapRefreshProps*/) {
    return (
        <div className="w-full h-full flex flex-col justify-evenly gap-4">
            <h2 className="text-[#00C8B3] text-xs tracking-widest">MAP REFRESH</h2>
            <h1 className="text-2xl">
                New satellite moisture layer available.
            </h1>
            <Button
                //onClick={() => refresh}
                variant="ghost"
                className="text-md tracking-wider flex justify-start"
            >
                Apply Update <ArrowRight />
            </Button>
        </div>
    )
}