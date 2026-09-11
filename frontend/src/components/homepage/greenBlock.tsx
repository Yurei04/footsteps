import InfoHomeCard from "./infoHomeCard"

const cardDataList = [
  {
    id: 1,
    title: "Rainfall alert verified",
    description: "Four sources agree on intense rainfall through the afternoon.",
    location: "MARIKINA BASIN",
    href: "/analytics",
    level: 3
  },
]

export default function GreenBlock() {
  return (
    <section 
      className="flex flex-col rounded-3xl border border-border w-[80%] h-[500px] justify-end p-16 m-4 bg-card shadow-lg hover:shadow-xl transition-shadow"
      role="region"
      aria-labelledby="green-block-heading"
      aria-describedby="green-block-description"
    >
      <h2 
        id="green-block-heading"
        className="sr-only"
      >
        Live Environmental Alerts
      </h2>
      
      <p 
        id="green-block-description"
        className="sr-only"
      >
        Real-time environmental risk alerts with suggested response plans for active conditions.
      </p>

      <InfoHomeCard data={cardDataList} />
    </section>
  )
}