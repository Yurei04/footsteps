
import AgentBlock from "@/components/reportsComp/agentBlock";
import ReportsBlock from "@/components/reportsComp/reportsBlock";

export default function Reports() {
  return (
    <div 
      className="w-full min-h-screen bg-white"
      role="application"
      aria-label="News and insights reports application"
    >
      <header 
        className="flex-col p-4 pl-8 mb-8"
        aria-describedby="reports-description"
      >
        <p 
          className="font-thin text-md text-gray-500 uppercase tracking-widest"
          aria-label="Page section"
        >
          NEWS & INSIGHTS
        </p>
        <h1 
          className="text-4xl text-black mt-2"
          id="page-title"
        >
          The local story, live.
        </h1>
        <p 
          className="text-gray-700 mt-3 max-w-2xl"
          id="reports-description"
        >
          National and local signals matched to active conditions. Curated
          public reports are matched against active environmental conditions.
        </p>
      </header>

      <main 
        role="main"
        aria-labelledby="page-title"
        aria-describedby="reports-description"
        className="px-8 pb-8"
      >
        <div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          role="region"
          aria-label="Reports and analysis section"
        >
          <aside 
            className="lg:col-span-1"
            aria-label="Agent analysis sidebar"
            role="complementary"
          >
            <section
              aria-labelledby="agent-heading"
              role="region"
            >
              <h2 
                className="sr-only"
                id="agent-heading"
              >
                AI Agent Analysis
              </h2>
              <AgentBlock />
            </section>
          </aside>

          <section 
            className="lg:col-span-2"
            aria-labelledby="reports-heading"
            role="region"
          >
            <h2 
              className="sr-only"
              id="reports-heading"
            >
              Curated Public Reports
            </h2>
            <ReportsBlock />
          </section>
        </div>
      </main>
    </div>
  );
}