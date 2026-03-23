import { TopicNavigation } from "@/components/TopicNavigation";
import { DynamicBreadcrumb } from "@/components/DynamicBreadcrumb";

export default function TracksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <DynamicBreadcrumb />
      <main className="flex-1 text-platinum flex flex-col">
        {children}
      </main>
      <TopicNavigation />
    </div>
  );
}
