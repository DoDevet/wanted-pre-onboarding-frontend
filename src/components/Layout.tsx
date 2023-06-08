export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center w-full my-24">
      <div className="w-full max-w-xl p-3 border">{children}</div>
    </div>
  );
}
