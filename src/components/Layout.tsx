export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full mt-60 flex items-center justify-center">
      <div className="max-w-xl w-full">{children}</div>
    </div>
  );
}
