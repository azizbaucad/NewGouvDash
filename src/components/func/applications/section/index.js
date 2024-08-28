import { ApplicationsBlock } from '@components/func/applications/block';
import { ApplicationsNotFound } from '@components/func/dashboard/empty';
import { useEnvironement } from '@hooks';
import { getApplicationAttributes } from '@utils/tools/_application/mappers';
import { Fragment, useEffect, useState } from 'react';

export const ApplicationsSection = ({ applications }) => {
  const { selectedEnv, isOnProd, switcher } = useEnvironement();

  const [apps, setApps] = useState({
    sandbox: [],
    prod: [],
    all: [],
  });

  useEffect(() => {
    setApps({
      sandbox: [],
      prod: [],
    });

    applications.map((application) => {
      const attributes = getApplicationAttributes(application.attributes);

      setApps((appList) => ({
        ...appList,
        [attributes.env]: [...appList[attributes.env], application],
      }));
    });
  }, [selectedEnv]);

  const _handleSearch = (input) => {
    const {
      target: { value },
    } = input;

    const found = applications.filter((app) => {
      const attributes = getApplicationAttributes(app.attributes);
      return attributes.name.toLowerCase().includes(value.toLowerCase());
    });

    setApps({ all: found });
  };

  return (
    <Fragment>
      {applications.length ? (
        <ApplicationsBlock
          {...{
            apps,
            isOnProd,
            selectedEnv,
            switcher,
            _handleSearch,
          }}
        />
      ) : (
        <ApplicationsNotFound />
      )}
    </Fragment>
  );
};
