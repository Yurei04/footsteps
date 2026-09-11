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
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <p 
              className="text-xs sm:text-sm text-primary uppercase tracking-widest font-semibold mb-2 sm:mb-3"
              id="page-intro"
            >
              Environmental Intelligence
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-3 sm:mb-4">
              Understand the risk <br className="hidden sm:block" /> before it becomes an <br className="hidden sm:block" /> impact.
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl">
              Search a location to analyze current weather conditions, environmental risks, 
              and recommended actions.
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="space-y-2 sm:space-y-3">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full">
              <Input
                type="text"
                placeholder="Enter a city or location"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                aria-label="Search for a location"
                aria-describedby="search-help"
                className="flex-1 bg-card border-border text-foreground placeholder:text-muted-foreground text-sm sm:text-base py-2 sm:py-2.5"
              />
              <Button
                type="submit"
                disabled={loading}
                className="bg-primary hover:bg-primary/90 text-primary-foreground whitespace-nowrap text-sm sm:text-base py-2 sm:py-2.5"
                aria-busy={loading}
              >
                <Search className="w-4 h-4 mr-2 flex-shrink-0" aria-hidden="true" />
                {loading ? 'Analyzing...' : 'Analyze'}
              </Button>
            </div>
            <p id="search-help" className="text-xs text-muted-foreground">
              Enter any city or location name to begin analysis
            </p>
            {error && (
              <div 
                role="alert" 
                className="text-xs sm:text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg p-3 sm:p-4 mt-2"
              >
                <p className="font-semibold mb-1">Error</p>
                <p className="break-words">{error}</p>
              </div>
            )}
          </form>
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