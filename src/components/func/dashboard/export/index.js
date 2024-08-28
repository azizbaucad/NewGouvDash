import { Button } from '@chakra-ui/react';
import { TfiExport } from 'react-icons/tfi';

export const Export = ({ onExport }) => (
  <Button
    rightIcon={<TfiExport />}
    colorScheme={'orange'}
    variant={'outline'}
    h={50.2}
    w={'8vw'}
    onClick={(e) => onExport(e.target.value)}
  >
    Export
  </Button>
);
