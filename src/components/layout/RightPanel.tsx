import { DonutChart } from '../charts/DonutChart';
import { SectionHeader } from '../ui/SectionHeader';
import { Panel } from './Panel';
import { categorySlices } from '@/util/categorySlices';
import type { Subscription } from '@/types/Subscription';

type RightPanelProps = {
  sliceData: Subscription[];
};

export function RightPanel({ sliceData }: RightPanelProps) {
  const slices = categorySlices(sliceData);

  return (
    <Panel side="right" size="panel">
      <section className="flex flex-col gap-3.5">
        <SectionHeader title="Where it goes" meta="By category" />
        {/* <DonutChart data={categories} /> */}
        <DonutChart slices={slices} currency="USD" />
      </section>

      <section className="flex flex-col gap-3">
        <SectionHeader title="Next 14 days" meta="3 renewals" />
        {/* <Timeline items={upcoming} /> */}
      </section>
    </Panel>
  );
}
