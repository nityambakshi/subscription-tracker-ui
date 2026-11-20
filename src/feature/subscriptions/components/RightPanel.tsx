import { DonutChart } from '../../../components/charts/DonutChart';
import { SectionHeader } from '../../../components/ui/SectionHeader';
import { Panel } from '../../../components/layout/Panel';
import { categorySlices } from '@/feature/subscriptions/utils/category-slices';
import type { Subscription } from '@/types/Subscription';
import { upcomingRenewals } from '@/feature/subscriptions/utils/upcoming-renewals';
import { DISPLAY_CURRENCY } from '@/feature/subscriptions/utils/subscription-stats';
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
        <SectionHeader
          title="Next 14 days"
          meta={`${upcoming.length} renewals.`}
        />
        <UpcomingRenewals items={upcoming} />
      </section>
    </Panel>
  );
}
