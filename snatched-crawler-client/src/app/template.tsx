import Navbar from '@/components/Navbar'
export default function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
        {children}

    </div>
  );
}
