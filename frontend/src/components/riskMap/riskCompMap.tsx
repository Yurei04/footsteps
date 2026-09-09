"use client"

import {
  Map,
  MapControls,
  MapMarker,
  MarkerContent,
  MarkerPopup,
  useMap,
} from "@/components/ui/map"

import { Button } from "@/components/ui/button"

import {
  Navigation,
  ExternalLink,
} from "lucide-react"

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"

interface Hotspot {
  id: string
  location: string
  country?: string
  latitude: number
  longitude: number
  riskLevel: string
  riskType: string
  precipitation: number
  temperature: number
  humidity: number
  windSpeed: number
  weatherCode: number | null
  riskReason: string
  date: string | null
  analyzedAt: string | null
}

/* =========================================================
   MAIN MAP
   ========================================================= */

export default function RiskWholeMap() {
  const [hotspots, setHotspots] =
    useState<Hotspot[]>([])

  const [
    selectedHotspot,
    setSelectedHotspot,
  ] = useState<Hotspot | null>(null)

  /* -------------------------------------------------------
     FETCH RISK DATA
     ------------------------------------------------------- */

  useEffect(() => {
    const fetchHotspots =
      async () => {
        try {
          const response =
            await fetch("/api/risk")

          if (!response.ok) {
            throw new Error(
              "Failed to fetch risk data"
            )
          }

          const data =
            await response.json()

          setHotspots(
            Array.isArray(data)
              ? data
              : []
          )
        } catch (error) {
          console.error(
            "Failed to fetch risk data:",
            error
          )
        }
      }

    fetchHotspots()

    const interval =
      setInterval(
        fetchHotspots,
        5 * 60 * 1000
      )

    return () =>
      clearInterval(interval)
  }, [])

  /* -------------------------------------------------------
     SELECT HOTSPOT
     ------------------------------------------------------- */

  const handleSelectHotspot =
    useCallback(
      (hotspot: Hotspot) => {
        setSelectedHotspot(
          hotspot
        )

        window.dispatchEvent(
          new CustomEvent(
            "hotspot-selected",
            {
              detail: {
                id: hotspot.id,
              },
            }
          )
        )
      },
      []
    )

  return (
    <div
      className="relative h-[400px] w-full"
      role="region"
      aria-label="Environmental risk map"
    >
      <p className="sr-only">
        Interactive global environmental
        risk map. Click any highlighted
        environmental risk area to view
        its conditions.
      </p>

      <Map
        center={[20, 20]}
        zoom={1.3}
        aria-label="Global environmental risk map"
      >
        <MapControls
          position="top-right"
          showZoom
          showCompass
          showFullscreen
          aria-label="Map navigation controls"
        />

        {/* =================================================
            HEATMAP
           ================================================= */}

        <RiskHeatmap
          hotspots={hotspots}
          onSelectHotspot={
            handleSelectHotspot
          }
        />

        {/* =================================================
            INVISIBLE POPUP MARKER
           
            This marker exists only because
            MarkerPopup must live inside MapMarker.
           
            It has NO visible pin.
           ================================================= */}

        {selectedHotspot && (
          <MapMarker
            longitude={Number(
              selectedHotspot.longitude
            )}
            latitude={Number(
              selectedHotspot.latitude
            )}
          >
            <MarkerContent>
              <div
                className="pointer-events-none size-0"
                aria-hidden="true"
              />
            </MarkerContent>

            <MarkerPopup
              className="w-64 p-0"

            >
              <EnvironmentalPopup
                hotspot={
                  selectedHotspot
                }
              />
            </MarkerPopup>
          </MapMarker>
        )}

        {/* =================================================
            LEGEND
           ================================================= */}

        <RiskLegend />
      </Map>
    </div>
  )
}

/* =========================================================
   RISK HEATMAP
   ========================================================= */

function RiskHeatmap({
  hotspots,
  onSelectHotspot,
}: {
  hotspots: Hotspot[]
  onSelectHotspot: (
    hotspot: Hotspot
  ) => void
}) {
  const { map } = useMap()

  const hotspotsRef =
    useRef<Hotspot[]>(hotspots)

  /* -------------------------------------------------------
     ALWAYS KEEP LATEST HOTSPOTS
     ------------------------------------------------------- */

  useEffect(() => {
    hotspotsRef.current =
      hotspots
  }, [hotspots])

  /* -------------------------------------------------------
     MAP SETUP
     ------------------------------------------------------- */

  useEffect(() => {
    if (!map) return

    const sourceId =
      "environmental-risk-source"

    const heatmapLayerId =
      "environmental-risk-gradient"

    /*
     * Invisible click layer.
     *
     * This is important:
     *
     * We DON'T rely on the heatmap layer
     * itself for clicking.
     *
     * The heatmap is visual.
     * The invisible circle layer is
     * responsible for detecting clicks.
     */

    const clickLayerId =
      "environmental-risk-click-target"

    /* -----------------------------------------------------
       CREATE GEOJSON
       ----------------------------------------------------- */

    const createGeoJSON = () => {
      return {
        type: "FeatureCollection",

        features:
          hotspots
            .filter(
              (spot) =>
                Number.isFinite(
                  Number(
                    spot.latitude
                  )
                ) &&
                Number.isFinite(
                  Number(
                    spot.longitude
                  )
                )
            )
            .map(
              (spot) => {
                const precipitation =
                  Number(
                    spot.precipitation
                  ) || 0

                const riskLevel =
                  (
                    spot.riskLevel ||
                    "LOW"
                  ).toUpperCase()

                /*
                 * Base risk.
                 */

                let riskScore =
                  0.25

                if (
                  riskLevel ===
                  "MEDIUM"
                ) {
                  riskScore =
                    0.55
                }

                if (
                  riskLevel ===
                  "HIGH"
                ) {
                  riskScore =
                    0.90
                }

                /*
                 * Rainfall increases
                 * environmental risk.
                 */

                const rainfallBoost =
                  Math.min(
                    precipitation /
                      40,
                    0.25
                  )

                const finalRisk =
                  Math.min(
                    riskScore +
                      rainfallBoost,
                    1
                  )

                return {
                  type: "Feature",

                  geometry: {
                    type: "Point",

                    coordinates: [
                      Number(
                        spot.longitude
                      ),
                      Number(
                        spot.latitude
                      ),
                    ],
                  },

                  properties: {
                    id: spot.id,

                    riskLevel,

                    precipitation,

                    riskScore:
                      finalRisk,
                  },
                }
              }
            ),
      }
    }

    /* -----------------------------------------------------
       REMOVE OLD LAYERS
       ----------------------------------------------------- */

    const removeExisting =
      () => {
        if (
          map.getLayer(
            clickLayerId
          )
        ) {
          map.removeLayer(
            clickLayerId
          )
        }

        if (
          map.getLayer(
            heatmapLayerId
          )
        ) {
          map.removeLayer(
            heatmapLayerId
          )
        }

        if (
          map.getSource(
            sourceId
          )
        ) {
          map.removeSource(
            sourceId
          )
        }
      }

    /* -----------------------------------------------------
       SETUP MAP
       ----------------------------------------------------- */

    const setupHeatmap =
      () => {
        if (
          !map.isStyleLoaded()
        ) {
          return
        }

        removeExisting()

        /* ================================================
           GEOJSON SOURCE
           ================================================ */

        map.addSource(
          sourceId,
          {
            type: "geojson",

            data:
              createGeoJSON() as any,
          }
        )

        /* ================================================
           HEATMAP
           ================================================ */

        map.addLayer({
          id: heatmapLayerId,

          type: "heatmap",

          source: sourceId,

          maxzoom: 10,

          paint: {
            /* --------------------------------------------
               RISK WEIGHT
               -------------------------------------------- */

            "heatmap-weight": [
              "interpolate",
              ["linear"],
              [
                "get",
                "riskScore",
              ],

              0,
              0.04,

              0.25,
              0.12,

              0.50,
              0.30,

              0.70,
              0.55,

              0.90,
              0.82,

              1,
              1,
            ],

            /* --------------------------------------------
               HEATMAP RADIUS

               Kept moderate so the map doesn't
               become one giant blob.
               -------------------------------------------- */

            "heatmap-radius": [
              "interpolate",
              ["linear"],
              ["zoom"],

              0,
              32,

              1,
              38,

              2,
              45,

              3,
              55,

              4,
              65,

              5,
              78,

              6,
              92,

              8,
              110,

              10,
              125,
            ],

            /* --------------------------------------------
               INTENSITY
               -------------------------------------------- */

            "heatmap-intensity": [
              "interpolate",
              ["linear"],
              ["zoom"],

              0,
              0.9,

              1,
              1.0,

              2,
              1.05,

              3,
              1.1,

              4,
              1.2,

              5,
              1.3,

              6,
              1.4,

              8,
              1.5,

              10,
              1.6,
            ],

            /* --------------------------------------------
               COLOR

               LOW
                 ↓
               MEDIUM
                 ↓
               HIGH
               -------------------------------------------- */

            "heatmap-color": [
              "interpolate",
              ["linear"],
              [
                "heatmap-density"
              ],

              0,
              "rgba(22,163,74,0)",

              0.08,
              "rgba(22,163,74,0.35)",

              0.18,
              "rgba(34,197,94,0.50)",

              0.30,
              "rgba(132,204,22,0.62)",

              0.42,
              "rgba(234,179,8,0.72)",

              0.54,
              "rgba(250,204,21,0.78)",

              0.66,
              "rgba(249,115,22,0.84)",

              0.78,
              "rgba(234,88,12,0.90)",

              0.88,
              "rgba(239,68,68,0.94)",

              0.96,
              "rgba(220,38,38,0.97)",

              1,
              "rgba(153,27,27,1)",
            ],

            /* --------------------------------------------
               OPACITY
               -------------------------------------------- */

            "heatmap-opacity": [
              "interpolate",
              ["linear"],
              ["zoom"],

              0,
              0.86,

              1,
              0.84,

              2,
              0.82,

              3,
              0.80,

              4,
              0.78,

              5,
              0.76,

              6,
              0.74,

              8,
              0.72,

              10,
              0.70,
            ],
          },
        })

        /* ================================================
           INVISIBLE CLICK TARGET

           This layer is NOT visible.

           Its purpose is simply to give every
           environmental data point a clickable
           area.
           ================================================ */

        map.addLayer({
          id: clickLayerId,

          type: "circle",

          source: sourceId,

          paint: {
            /*
             * Completely transparent.
             */

            "circle-radius": [
              "interpolate",
              ["linear"],
              ["zoom"],

              0,
              18,

              1,
              18,

              2,
              17,

              3,
              16,

              4,
              15,

              5,
              14,

              6,
              13,

              8,
              12,

              10,
              10,
            ],

            "circle-color":
              "#000000",

            /*
             * Very small opacity keeps
             * the click target active without
             * creating visible pins.
             */

            "circle-opacity": 0.01,

            "circle-stroke-opacity": 0,
          },
        })

        /* =================================================
           CLICK HANDLER
           ================================================= */

        const handleMapClick =
          (event: any) => {
            /*
             * Find actual environmental
             * points underneath the click.
             */

            const features =
              map.queryRenderedFeatures(
                event.point,
                {
                  layers: [
                    clickLayerId,
                  ],
                }
              )

            /*
             * If the click didn't hit
             * an exact click target,
             * don't immediately give up.
             *
             * We will use the clicked
             * coordinates and find the
             * nearest environmental point.
             */

            let nearest:
              | Hotspot
              | null = null

            let nearestDistance =
              Infinity

            const clickedLatitude =
              Number(
                event.lngLat.lat
              )

            const clickedLongitude =
              Number(
                event.lngLat.lng
              )

            /* --------------------------------------------
               EXACT FEATURE FIRST
               -------------------------------------------- */

            if (
              features &&
              features.length > 0
            ) {
              const clickedId =
                features[0]
                  ?.properties
                  ?.id

              if (clickedId) {
                const exact =
                  hotspotsRef.current.find(
                    (spot) =>
                      String(
                        spot.id
                      ) ===
                      String(
                        clickedId
                      )
                  )

                if (exact) {
                  nearest =
                    exact
                }
              }
            }

            /* --------------------------------------------
               OTHERWISE FIND NEAREST POINT
               -------------------------------------------- */

            if (!nearest) {
              hotspotsRef.current.forEach(
                (spot) => {
                  const latitude =
                    Number(
                      spot.latitude
                    )

                  const longitude =
                    Number(
                      spot.longitude
                    )

                  if (
                    !Number.isFinite(
                      latitude
                    ) ||
                    !Number.isFinite(
                      longitude
                    )
                  ) {
                    return
                  }

                  /*
                   * Longitude becomes distorted
                   * near the poles.
                   *
                   * For this application,
                   * this simple geographic distance
                   * is sufficient.
                   */

                  const latitudeDifference =
                    latitude -
                    clickedLatitude

                  const longitudeDifference =
                    longitude -
                    clickedLongitude

                  const distance =
                    Math.sqrt(
                      Math.pow(
                        latitudeDifference,
                        2
                      ) +
                        Math.pow(
                          longitudeDifference,
                          2
                        )
                    )

                  if (
                    distance <
                    nearestDistance
                  ) {
                    nearestDistance =
                      distance

                    nearest =
                      spot
                  }
                }
              )
            }

            /* --------------------------------------------
               SELECT RESULT
               -------------------------------------------- */

            if (!nearest) {
              return
            }

            onSelectHotspot(
              nearest
            )

            /* --------------------------------------------
               ZOOM TO SELECTED LOCATION
               -------------------------------------------- */

            map.flyTo({
              center: [
                Number(
                  nearest.longitude
                ),
                Number(
                  nearest.latitude
                ),
              ],

              /*
               * Don't zoom too aggressively
               * when already zoomed in.
               */

              zoom: Math.max(
                map.getZoom(),
                4.5
              ),

              duration: 900,

              essential: true,
            })
          }

        /* =================================================
           CURSOR
           ================================================= */

        const handleMouseMove =
          (event: any) => {
            const features =
              map.queryRenderedFeatures(
                event.point,
                {
                  layers: [
                    clickLayerId,
                  ],
                }
              )

            if (
              features.length >
              0
            ) {
              map.getCanvas().style.cursor =
                "pointer"
            } else {
              map.getCanvas().style.cursor =
                ""
            }
          }

        const handleMouseLeave =
          () => {
            map.getCanvas().style.cursor =
              ""
          }

        /* =================================================
           REGISTER EVENTS
           ================================================= */

        map.on(
          "click",
          handleMapClick
        )

        map.on(
          "mousemove",
          handleMouseMove
        )

        map.on(
          "mouseleave",
          clickLayerId,
          handleMouseLeave
        )

        /* =================================================
           STORE HANDLERS FOR CLEANUP
           ================================================= */

        const mapAny =
          map as any

        mapAny.__riskClick =
          handleMapClick

        mapAny.__riskMouseMove =
          handleMouseMove

        mapAny.__riskMouseLeave =
          handleMouseLeave
      }

    /* -----------------------------------------------------
       WAIT FOR MAP STYLE
       ----------------------------------------------------- */

    if (
      map.isStyleLoaded()
    ) {
      setupHeatmap()
    } else {
      map.once(
        "load",
        setupHeatmap
      )
    }

    /* -----------------------------------------------------
       CLEANUP
       ----------------------------------------------------- */

    return () => {
      map.off(
        "load",
        setupHeatmap
      )

      const mapAny =
        map as any

      const clickHandler =
        mapAny.__riskClick

      const mouseMoveHandler =
        mapAny.__riskMouseMove

      const mouseLeaveHandler =
        mapAny.__riskMouseLeave

      if (clickHandler) {
        map.off(
          "click",
          clickHandler
        )
      }

      if (
        mouseMoveHandler
      ) {
        map.off(
          "mousemove",
          mouseMoveHandler
        )
      }

      if (
        mouseLeaveHandler
      ) {
        map.off(
          "mouseleave",
          clickLayerId,
          mouseLeaveHandler
        )
      }

      delete mapAny.__riskClick
      delete mapAny.__riskMouseMove
      delete mapAny.__riskMouseLeave

      if (
        map.isStyleLoaded()
      ) {
        if (
          map.getLayer(
            clickLayerId
          )
        ) {
          map.removeLayer(
            clickLayerId
          )
        }

        if (
          map.getLayer(
            heatmapLayerId
          )
        ) {
          map.removeLayer(
            heatmapLayerId
          )
        }

        if (
          map.getSource(
            sourceId
          )
        ) {
          map.removeSource(
            sourceId
          )
        }
      }
    }
  }, [
    map,
    hotspots,
    onSelectHotspot,
  ])

  return null
}

/* =========================================================
   ENVIRONMENTAL POPUP
   ========================================================= */

function EnvironmentalPopup({
  hotspot,
}: {
  hotspot: Hotspot
}) {
  const riskLevel =
    (
      hotspot.riskLevel ||
      "LOW"
    ).toUpperCase()

  return (
    <div className="space-y-3 p-3">
      {/* -------------------------------------------------
          HEADER
         ------------------------------------------------- */}

      <div>
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Environmental Risk
        </p>

        <h3 className="mt-1 text-base font-semibold leading-tight">
          {hotspot.location}
        </h3>

        {hotspot.country && (
          <p className="mt-0.5 text-xs text-muted-foreground">
            {hotspot.country}
          </p>
        )}
      </div>

      {/* -------------------------------------------------
          RISK LEVEL
         ------------------------------------------------- */}

      <div className="rounded-lg border p-2.5">
        <p className="text-sm font-bold">
          {riskLevel} RISK
        </p>

        <p className="mt-1 text-sm">
          {hotspot.riskType}
        </p>
      </div>

      {/* -------------------------------------------------
          REASON
         ------------------------------------------------- */}

      <p className="text-xs leading-relaxed text-muted-foreground">
        {hotspot.riskReason}
      </p>

      {/* -------------------------------------------------
          WEATHER INFORMATION
         ------------------------------------------------- */}

      <div className="grid grid-cols-2 gap-x-4 gap-y-3">
        <div>
          <p className="text-[10px] uppercase text-muted-foreground">
            Rainfall
          </p>

          <p className="text-sm font-semibold">
            {hotspot.precipitation} mm
          </p>
        </div>

        <div>
          <p className="text-[10px] uppercase text-muted-foreground">
            Temperature
          </p>

          <p className="text-sm font-semibold">
            {hotspot.temperature} °C
          </p>
        </div>

        <div>
          <p className="text-[10px] uppercase text-muted-foreground">
            Humidity
          </p>

          <p className="text-sm font-semibold">
            {hotspot.humidity}%
          </p>
        </div>

        <div>
          <p className="text-[10px] uppercase text-muted-foreground">
            Wind Speed
          </p>

          <p className="text-sm font-semibold">
            {hotspot.windSpeed} km/h
          </p>
        </div>
      </div>

      {/* -------------------------------------------------
          ACTIONS
         ------------------------------------------------- */}

      <div className="flex gap-2 pt-1">
        <Button
          size="sm"
          className="flex-1"
        >
          <Navigation className="mr-1 size-3.5" />
          Directions
        </Button>

        <Button
          size="icon-sm"
          variant="outline"
          aria-label="Open location"
        >
          <ExternalLink className="size-3.5" />
        </Button>
      </div>
    </div>
  )
}

/* =========================================================
   RISK LEGEND
   ========================================================= */

function RiskLegend() {
  return (
    <div
      className="
        absolute
        bottom-4
        left-4
        z-10
        rounded-xl
        border
        bg-white/95
        p-3
        shadow-lg
        backdrop-blur-sm
      "
      aria-label="Environmental risk legend"
    >
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-700">
        Environmental Risk
      </p>

      <div
        className="mb-2 h-3 w-48 rounded-full"
        style={{
          background:
            "linear-gradient(to right, #16a34a, #84cc16, #eab308, #f97316, #dc2626, #991b1b)",
        }}
      />

      <div className="flex justify-between text-[10px] font-semibold text-gray-700">
        <span>Low</span>

        <span>Medium</span>

        <span>High</span>
      </div>

      <p className="mt-2 text-[10px] text-gray-500">
        Click a risk area for details
      </p>
    </div>
  )
}
