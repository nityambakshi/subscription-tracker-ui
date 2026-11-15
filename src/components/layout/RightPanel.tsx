import { DonutChart } from '../charts/DonutChart';
import { SectionHeader } from '../ui/SectionHeader';
import { Panel } from './Panel';
import { categorySlices } from '@/util/categorySlices';
import type { Subscription } from '@/types/Subscription';
import { upcomingRenewals } from '@/util/upcomingRenewals';
import { DISPLAY_CURRENCY } from '@/util/subscription-stats';
import { UpcomingRenewals } from './UpcomingRenewals';

type RightPanelProps = {
  sliceData: Subscription[];
};

export function RightPanel({ sliceData }: RightPanelProps) {
  const slices = categorySlices(sliceData);
  const upcoming = upcomingRenewals(sliceData, 14);

  return (
    <Panel side="right" size="panel">
      <section className="flex flex-col gap-3.5">
        <SectionHeader title="Where it goes" meta="By category" />
        <DonutChart slices={slices} currency={DISPLAY_CURRENCY} />
      </section>

      <section className="flex flex-col gap-3">
        <SectionHeader title="Next 14 days" meta="3 renewals" />
        <UpcomingRenewals items={upcoming} />
      </section>
    </Panel>
  );
}
