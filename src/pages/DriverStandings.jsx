export default function DriverStandings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Driver Standings
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Current world championship rankings and driver statistics.
        </p>
      </div>
      
      <div className="flex h-[500px] items-center justify-center rounded-xl border-2 border-dashed bg-card text-card-foreground shadow-sm">
        <p className="text-sm font-medium text-muted-foreground">
          Jolpi API Data Table will render here
        </p>
      </div>
    </div>
  );
}
