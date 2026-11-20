export default function Spinner() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg" role="status" aria-label="Cargando">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-accent" />
    </div>
  );
}
