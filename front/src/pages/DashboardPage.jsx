import { useMemo } from 'react'
import GroupsPanel from '../components/dashboard/GroupsPanel'
import QuickActionsPanel from '../components/dashboard/QuickActionsPanel'
import RecentActivityPanel from '../components/dashboard/RecentActivityPanel'
import SummaryGrid from '../components/dashboard/SummaryGrid'
import AppShell from '../components/layout/AppShell'
import {
  activitiesMock,
  groupsMock,
  transfersMock,
} from '../data/dashboardMock'

function DashboardPage() {
  const summary = useMemo(() => {
    const totalMonth = groupsMock.reduce((acc, group) => acc + group.monthTotal, 0)
    const myBalance = groupsMock.reduce((acc, group) => acc + group.myBalance, 0)
    const toReceive = Math.max(myBalance, 0)
    const toPay = Math.max(myBalance * -1, 0)

    return {
      totalMonth,
      myBalance,
      toReceive,
      toPay,
    }
  }, [])

  return (
    <AppShell>
      <header className="dashboard-header">
        <div>
          <p className="eyebrow">Segunda-feira financeira</p>
          <h1>Olá, Gabriel. Vamos organizar suas contas?</h1>
        </div>
      </header>

      <SummaryGrid summary={summary} />

      <section className="dashboard-main-grid">
        <GroupsPanel groups={groupsMock} />
        <QuickActionsPanel transfers={transfersMock} />
      </section>

      <RecentActivityPanel activities={activitiesMock} />
    </AppShell>
  )
}

export default DashboardPage
