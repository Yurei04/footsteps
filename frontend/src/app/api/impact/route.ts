export async function GET() {
  const impactData = {
    stats: [
      {
        id: 1,
        label: "Events logged",
        value: "142",
        subtext: "This month",
      },
      {
        id: 2,
        label: "Areas stabilised",
        value: "37",
        subtext: "Cities and Country",
      },
      {
        id: 3,
        label: "Plans completed",
        value: "28",
        subtext: "Last 30 days",
      },
      {
        id: 4,
        label: "Avg response",
        value: "2.4 hr",
        subtext: "Time to action",
      },
    ],
    timeline: [
      {
        id: 1,
        date: "Aug 20",
        title: "Kuala Lumpur Malaysia flood plan deployed",
        description: "3 cities stabilised",
        status: "Reached",
        statusColor: "blue",
      },
      {
        id: 2,
        date: "Aug 25",
        title: "Philippines coastal advisory issued",
        description: "1,200 households notified",
        status: "Reached",
        statusColor: "blue",
      },
      {
        id: 3,
        date: "Aug 27",
        title: "Indonesia watershed alert",
        description: "monitoring extended 72 hrs",
        status: "Monitoring",
        statusColor: "gray",
      },
      {
        id: 4,
        date: "Aug 29",
        title: "Regional coordination meeting held",
        description: "12 agencies participating",
        status: "Active",
        statusColor: "green",
      },
      {
        id: 5,
        date: "Sep 02",
        title: "Community outreach program launched",
        description: "850 residents engaged",
        status: "Reached",
        statusColor: "blue",
      },
    ],
  };

  return Response.json(impactData);
}