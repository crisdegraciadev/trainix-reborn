import { Badge } from "@components/ui/badge";

import packageInfo from "../../../package.json";

export default function Footer() {
  return (
    <footer className="h-14 bottom-0 fixed w-full px-48 border-t">
      <div className="flex justify-center gap-2 items-center h-full">
        <Badge variant="secondary">Version</Badge>
        <Badge>{packageInfo.version}</Badge>
      </div>
    </footer>
  );
}
