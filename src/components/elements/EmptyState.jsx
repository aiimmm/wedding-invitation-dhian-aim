import { FrownIcon } from "lucide-react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty";

export default function EmptyState({ title, description }) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia>
          <FrownIcon size={52} />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        {description && <EmptyDescription>{description}</EmptyDescription>}
      </EmptyHeader>
    </Empty>
  );
}
