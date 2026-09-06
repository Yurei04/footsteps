export async function GET() {
  const reports = [
    {
      id: 1,
      category: "Weather",
      title: "WEATHER: 18.4 mm/hr current rainfall",
      timestamp: "Just now",
      icon: "cloud",
      description: "Current weather conditions showing significant rainfall activity in your area.",
      details: "Real-time precipitation data indicates 18.4 millimeters per hour. This level of rainfall may impact outdoor activities and visibility.",
    },
    {
      id: 2,
      category: "News",
      title: "River advisory mentioned across 6 local sources",
      timestamp: "Just now",
      icon: "alert",
      description: "Multiple news outlets reporting on river conditions and advisories.",
      details: "6 local news sources have mentioned river advisory in the past hour. This suggests significant water level activity in regional rivers.",
    },
    {
      id: 3,
      category: "Location",
      title: "27 cities intersect flood exposure polygon",
      timestamp: "Just now",
      icon: "map",
      description: "Geographic analysis shows potential flood risk areas.",
      details: "Analysis of flood exposure data indicates 27 cities fall within identified flood risk polygons based on current conditions.",
    },
    {
      id: 4,
      category: "History",
      title: "14 comparable rainfall events found since 2012",
      timestamp: "Just now",
      icon: "history",
      description: "Historical comparison with similar weather patterns.",
      details: "Database search found 14 rainfall events since 2012 with comparable intensity and duration to current conditions.",
    },
  ];

  return Response.json({ reports, status: "success" });
}