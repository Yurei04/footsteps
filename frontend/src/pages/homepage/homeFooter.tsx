import Link from "next/link";


export default function HomeFooter () {
    return (
        <div className="flex flex-col h-[300px] bg-[#EBF8E3] w-full justify-center items-center">
            <div className="flex flex-col justify-start bg-[#E3faeb] min-h-3/4 w-full p-8">
                <div className="flex justify-between items-center">
                    <p className="text-xs tracking-widest font-thin text-black"> EARTH FORWARD </p>
                    <Link
                        href={"/"}
                        className="rounded-xl px-4 py-2 bg-black "
                    >
                        Button
                    </Link>
                </div>
                <div className="px-4">
                    <h1 className="text-4xl font-bold tracking-widest">
                        For decisions that protect 
                        <br/>
                        people and place.
                    </h1>
                </div>
            </div>
            <div className="flex p-6 justify-center items-center">
                <p className="text-xs font-thin tracking-widest text-black">
                    EARTH FORWARD · ENVIRONMENTAL INTELLIGENCE
                </p>
            </div>
        </div>
    )
}