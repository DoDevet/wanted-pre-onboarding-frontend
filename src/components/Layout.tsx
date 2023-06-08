export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center w-full mt-60">
      <div className="w-full max-w-xl">{children}</div>
    </div>
  );
}
