import { routes } from '@theme';

export const roleToDirection = (role) => {
  const {
    dashboard,
    ofms,
    dmgp,
    desc,
    dv,
    dde,
    digital,
    drh,
    drj,
    dsi,
    dcire,
    arq,
    dfc,
    dst,
    drps,
    dal,
  } = routes.pages;

  if (role.includes('admin') || role.includes('codir'))
    return dashboard.initial;

  if (role.includes('ofms')) return ofms.initial;
  if (role.includes('dmgp')) return dmgp.initial;
  if (role.includes('desc')) return desc.initial;
  if (role.includes('dv')) return dv.initial;
  if (role.includes('ddeRole')) return dde.initial;
  if (role.includes('digital')) return digital.initial;
  if (role.includes('drj')) return drj.initial;
  if (role.includes('dsi')) return dsi.initial;
  if (role.includes('drh')) return drh.initial;
  if (role.includes('dcire')) return dcire.initial;
  if (role.includes('arq')) return arq.initial;
  if (role.includes('dfc')) return dfc.initial;
  if (role.includes('dst')) return dst.initial;
  if (role.includes('drps')) return drps.initial;
  if (role.includes('dal')) return dal.initial;
  else return 'user/auth';
};
