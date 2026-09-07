"use client"

import { Map, MapMarker, MarkerContent, MarkerPopup, MapControls, MarkerLabel } from "@/components/ui/map";
import { Button } from "@/components/ui/button";
import { Star, Navigation, Clock, ExternalLink } from "lucide-react";
import Image from "next/image";

const places = [
  {
    id: 1,
    name: "The Metropolitan Museum of Art",
    label: "Museum",
    category: "Museum",
    rating: 4.8,
    reviews: 12453,
    hours: "10:00 AM - 5:00 PM",
    image:
      "/images/logo2.jpeg",
    lng: -73.9632,
    lat: 40.7794,
  },
  {
    id: 2,
    name: "Brooklyn Bridge",
    label: "Landmark",
    category: "Landmark",
    rating: 4.9,
    reviews: 8234,
    hours: "Open 24 hours",
    image:
      "/images/logo2.jpeg",
    lng: -73.9969,
    lat: 40.7061,
  },
  {
    id: 3,
    name: "Grand Central Terminal",
    label: "Transit",
    category: "Transit",
    rating: 4.7,
    reviews: 5621,
    hours: "5:15 AM - 2:00 AM",
    image:
      "/images/logo2.jpeg",
    lng: -73.9772,
    lat: 40.7527,
  },
];

export default function RiskWholeMap () {
    return (
        <div 
          className="h-[400px] w-full"
          role="region"
          aria-label="Risk assessment map showing places of interest"
          aria-describedby="map-description"
        >
            <p id="map-description" className="sr-only">
              Interactive map showing {places.length} locations with risk ratings, hours of operation, and contact information.
            </p>
            
            <Map 
              center={[2.3522, 48.8566]} 
              zoom={10}
              aria-label="Geographic risk map"
            >
                <MapControls
                  position="top-right"
                  showZoom
                  showCompass
                  showLocate
                  showFullscreen
                  aria-label="Map navigation controls"
                />
                
                {places.map((place) => (
                    <MapMarker 
                      key={place.id} 
                      longitude={place.lng} 
                      latitude={place.lat}
                      aria-label={`${place.name}, ${place.category}`}
                    >
                        <MarkerContent>
                            <div 
                              className="size-5 cursor-pointer rounded-full border-2 border-white bg-rose-500 shadow-lg transition-transform hover:scale-110" 
                              role="button"
                              tabIndex={0}
                              aria-label={`Location marker: ${place.name}. Rating: ${place.rating} out of 5. Click to view details.`}
                              aria-pressed="false"
                            />
                            <MarkerLabel position="bottom">
                              <span aria-label={`${place.label}: ${place.name}`}>
                                {place.label}
                              </span>
                            </MarkerLabel>
                        </MarkerContent>
                        
                        <MarkerPopup 
                          className="w-62 p-0"
                          aria-labelledby={`popup-title-${place.id}`}
                          aria-describedby={`popup-desc-${place.id}`}
                        >
                            <div 
                              className="relative h-32 overflow-hidden rounded-t-md"
                              role="img"
                              aria-label={`Image of ${place.name}`}
                            >
                                <Image
                                    fill
                                    src={place.image}
                                    alt={`${place.name} location photo`}
                                    className="object-cover"
                                />
                            </div>
                            
                            <div className="space-y-2 p-3">
                                <div>
                                    <p 
                                      className="text-muted-foreground pb-0.5 text-[11px] font-medium tracking-wide uppercase"
                                      aria-label="Location category"
                                    >
                                        {place.category}
                                    </p>
                                    <h3 
                                      id={`popup-title-${place.id}`}
                                      className="text-foreground leading-tight font-semibold"
                                    >
                                        {place.name}
                                    </h3>
                                </div>
                                
                                <div 
                                  id={`popup-desc-${place.id}`}
                                  className="space-y-2"
                                >
                                    <div 
                                      className="flex items-center gap-3 text-sm"
                                      role="region"
                                      aria-label="Location rating"
                                    >
                                        <div className="flex items-center gap-1">
                                            <Star 
                                              className="size-3.5 fill-amber-400 text-amber-400" 
                                              aria-hidden="true"
                                            />
                                            <span className="font-medium">
                                              <span aria-label="Rating">{place.rating}</span>
                                              <span className="sr-only"> out of 5 stars</span>
                                            </span>
                                            <span className="text-muted-foreground">
                                              (
                                              <span aria-label={`${place.reviews} reviews`}>
                                                {place.reviews.toLocaleString()}
                                              </span>
                                              )
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div 
                                      className="text-muted-foreground flex items-center gap-1.5 text-sm"
                                      role="region"
                                      aria-label="Operating hours"
                                    >
                                        <Clock 
                                          className="size-3.5" 
                                          aria-hidden="true"
                                        />
                                        <span>{place.hours}</span>
                                    </div>
                                    
                                    <div 
                                      className="flex gap-2 pt-1"
                                      role="group"
                                      aria-label="Actions"
                                    >
                                        <Button 
                                          size="sm" 
                                          className="flex-1"
                                          aria-label={`Get directions to ${place.name}`}
                                        >
                                            <Navigation 
                                              className="size-3.5" 
                                              aria-hidden="true"
                                            />
                                            Directions
                                        </Button>
                                        <Button 
                                          size="icon-sm" 
                                          variant="outline"
                                          aria-label={`Open ${place.name} in new window`}
                                        >
                                            <ExternalLink 
                                              className="size-3.5"
                                              aria-hidden="true"
                                            />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </MarkerPopup>
                    </MapMarker>
                ))}
            </Map>
        </div>
    )
}