'use client'

import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { analyzeLocation, LocationAnalysis } from "@/lib/api"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SearchResults } from './searchResults' 

export function MainContent() {
  const [searchInput, setSearchInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<LocationAnalysis | null>(null)

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault()

    if (!searchInput.trim()) {
      setError('Please enter a location')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const analysis = await analyzeLocation(searchInput)
      setResult(analysis)
      setError(null)
      
      // Scroll to results on mobile
      setTimeout(() => {
        const resultsElement = document.querySelector('#search-results')
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    } catch (err) {
      console.error('Search error:', err)
      setError(err instanceof Error ? err.message : 'Failed to analyze location')
      setResult(null)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Search Section */}
      <section className="w-full px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        <div className="mx-auto">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <p 
              className="text-[9px] text-primary uppercase tracking-widest mb-2 sm:mb-3"
              id="page-intro"
            >
              Environmental Intelligence
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tighter mb-3 sm:mb-4">
              Understand the risk <br className="hidden sm:block" /> before it becomes an <br className="hidden sm:block" /> impact.
            </h1>
            <p className="text-md text-muted-foreground max-w-2xl">
              Search a location to analyze current weather conditions, environmental risks, 
              and recommended actions.
            </p>
          </div>
          <form onSubmit={handleSearch} className="w-full space-y-3 sm:space-y-4">
            <p
              id="search-help"
              className="text-[9px] tracking-widest text-muted-foreground uppercase"
            >
              Search a location
            </p>
            <div className="flex w-1/2 flex-col gap-3 sm:flex-row sm:gap-4">
              <Input
                type="text"
                placeholder="Enter a city or location"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                aria-label="Search for a location"
                aria-describedby="search-help"
                className="h-11 w-full flex-1 bg-card px-4 text-base text-foreground placeholder:text-muted-foreground sm:h-12"
              />

              <Button
                type="submit"
                disabled={loading}
                className="h-11 w-full bg-primary px-5 text-base text-primary-foreground hover:bg-primary/90 sm:h-12 sm:w-auto sm:min-w-32 sm:px-6"
                aria-busy={loading}
              >
                <Search
                  className="mr-2 h-4 w-4 flex-shrink-0"
                  aria-hidden="true"
                />
                {loading ? "Analyzing..." : "Analyze"}
              </Button>
            </div>

            {error && (
              <div
                role="alert"
                className="mt-2 rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-xs text-destructive sm:p-4 sm:text-sm"
              >
                <p className="mb-1 font-semibold">Error</p>
                <p className="break-words">{error}</p>
              </div>
            )}
          </form>
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <span className="text-xs text-muted-foreground sm:text-sm">
              Try:
            </span>

            {["Manila", "Baguio City", "Cebu City", "Davao City", "Quezon City"].map(
              (location) => (
                <button
                  key={location}
                  type="button"
                  onClick={() => {
                    setSearchInput(location);
                  }}
                  className="rounded-full border border-border bg-card/50 px-3 py-1.5 text-xs text-muted-foreground transition-colors duration-200 hover:border-[var(--accent)]/50 hover:bg-[var(--accent)]/10 hover:text-[var(--accent)] sm:text-sm"
                >
                  {location}
                </button>
              )
            )}
          </div>
        </div>
      </section>

      {/* Loading State */}
      {loading && (
        <section className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
            <p className="text-sm sm:text-base text-muted-foreground">Analyzing location...</p>
          </div>
        </section>
      )}

      {/* Results Section */}
      {result && !loading && (
        <div id="search-results">
          <SearchResults result={result} />
        </div>
      )}

      {/* Empty State - Only show if no result AND not loading */}
      {!result && !loading && (
        <section className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="text-center text-muted-foreground">
            <p className="text-sm sm:text-base">Search a location to view analysis results</p>
          </div>
        </section>
      )}
    </div>
  )
}