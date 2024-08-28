import { Media } from '@utils/media';
import { DesktopDashboardLayoutView, MobileDashboardLayoutView } from './views';

export const DashboardLayout = ({ children, activeMenu, title }) => {
  const activeLink = {
    activeTab: activeMenu?.split('-')?.[0] == 'account' ? 0 : 1,
    activeOption: activeMenu?.split('-')?.[1],
  };

  return (
    <>
      <Media greaterThanOrEqual={'lg'}>
        <DesktopDashboardLayoutView title={title} activeLink={activeLink}>
          {children}
        </DesktopDashboardLayoutView>
      </Media>
      <Media lessThan={'lg'}>
        <MobileDashboardLayoutView activeLink={activeLink} title={title}>
          {children}
        </MobileDashboardLayoutView>
      </Media>
    </>
  );
};
