import { Chip } from '@/components/ui/Chip';
import { categories } from '@/constants/mock-constants';
import type { Category } from '@/types/types';

type Props = {
  value: Category;
  onChange: (category: Category) => void;
};

export function CategoryFilter({ value, onChange }: Props) {
  return (
    <div
      role="group"
      aria-label="Filter by category"
      className="flex gap-1.5 overflow-x-auto"
    >
      {categories.map((c) => (
        <Chip key={c} active={value === c} onClick={() => onChange(c)}>
          {c}
        </Chip>
      ))}
    </div>
  );
}
