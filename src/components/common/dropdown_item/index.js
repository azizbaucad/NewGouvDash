import { Select, Box } from '@chakra-ui/react';
import { scroll_customize } from '../styleprops';
import { getLastWeekList } from '@utils/services/date';
import { useState } from 'react';

export const ListSemaineItem = ({ selectedWeek, onWeekSelect }) => {
  const listoptions = getLastWeekList().map((date) => {
    return { value: date.week + '-' + date.year, label: 'S' + date.week };
  });

  return (
    <Box>
      <Box mr={1} bg={'#fff'} borderRadius={6}>
        <Select
          type="text"
          overflowY={'auto'}
          css={scroll_customize}
          onChange={(e) => onWeekSelect(e.target.value)}
          value={selectedWeek}
        >
          {listoptions.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </Box>
    </Box>
  );
};

export const HightLightFilter = ({
  selectedStatus,
  listStatus,
  onFilterChange,
}) => {
  const [filteredStatus, setFilteredStatus] = useState([]);

  const filterStatus = (status) => {
    let newFilteredStatus;
    if (
      status === 'Realise' ||
      status === 'realize' ||
      status === 'realizes' ||
      status === 'realized' ||
      status === 'Réalisés'
    ) {
      newFilteredStatus = [];
    } else {
      newFilteredStatus = listStatus.filter((item) => item === status);
    }
    setFilteredStatus(newFilteredStatus);
    onFilterChange(newFilteredStatus); // Appeler la fonction après avoir mis à jour l'état
  };

  return (
    <Box>
      <Box mr={1} bg={'#fff'} borderRadius={6}>
        <Select
          width={'15rem'}
          type="text"
          value={selectedStatus}
          onChange={(e) => filterStatus(e.target.value)}
        >
          {listStatus.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </Box>
    </Box>
  );
};

export const DirectionFilter = () => {
  const listStatus = ['All', 'DMGP', 'OFMS', 'DV', 'DESC', 'DFC', 'DST'];

  return (
    <Box>
      <Box mr={1} bg={'#fff'} borderRadius={6}>
        <Select width={'15rem'} type="text">
          {listStatus.map((option, index) => (
            <option key={index} value={option[0]}>
              {option}
            </option>
          ))}
        </Select>
      </Box>
    </Box>
  );
};
