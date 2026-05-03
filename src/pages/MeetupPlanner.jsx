export default function MeetupPlanner() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Race Day Meetup Planner
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Organize and manage fan meetups for upcoming races.
        </p>
      </div>
      
      <div className="flex h-[500px] items-center justify-center rounded-xl border-2 border-dashed bg-card text-card-foreground shadow-sm">
        <p className="text-sm font-medium text-muted-foreground">
          CRUD Form will render here
        </p>
      </div>
    </div>
  );
}
