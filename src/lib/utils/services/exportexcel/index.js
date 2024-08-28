import React from 'react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { IconedButton } from '@components/common/button';
import { FaFileExcel } from 'react-icons/fa';

export const ExportToExcel = ({ apiData, fileName, buttonDownloadLabel }) => {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const exportToCSV = () => {
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <IconedButton
      variant={'outline'}
      bgColor={'light'}
      color={'#000'}
      message={buttonDownloadLabel}
      rightIcon={<FaFileExcel />}
      onClick={exportToCSV}
    />
  );
};
