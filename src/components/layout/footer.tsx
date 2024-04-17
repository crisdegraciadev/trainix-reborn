import { Badge } from "@components/ui/badge";

export default function Footer() {
  return (
    <footer className="h-14 bottom-0 bg-white fixed w-full px-48 border-t">
      <div className="flex justify-center gap-2 items-center h-full">
        <Badge variant="secondary">Version</Badge>
        <Badge>1.0.0</Badge>
      </div>
    </footer>
  );
}
