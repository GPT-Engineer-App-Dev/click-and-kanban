import React, { useState } from 'react';
import { Box, Button, Container, Input, Table, Thead, Tbody, Tr, Th, Td, VStack, HStack } from '@chakra-ui/react';
import Papa from 'papaparse';
import { CSVLink } from 'react-csv';

const CSVUploader = () => {
  const [csvData, setCsvData] = useState([]);
  const [headers, setHeaders] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          setHeaders(Object.keys(result.data[0]));
          setCsvData(result.data);
        },
      });
    }
  };

  const handleCellChange = (rowIndex, columnId, value) => {
    const updatedData = [...csvData];
    updatedData[rowIndex][columnId] = value;
    setCsvData(updatedData);
  };

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={4}>
        <Input type="file" accept=".csv" onChange={handleFileUpload} />
        {csvData.length > 0 && (
          <>
            <Box overflowX="auto" w="100%">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    {headers.map((header) => (
                      <Th key={header}>{header}</Th>
                    ))}
                  </Tr>
                </Thead>
                <Tbody>
                  {csvData.map((row, rowIndex) => (
                    <Tr key={rowIndex}>
                      {headers.map((columnId) => (
                        <Td key={columnId}>
                          <Input
                            value={row[columnId]}
                            onChange={(e) => handleCellChange(rowIndex, columnId, e.target.value)}
                          />
                        </Td>
                      ))}
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
            <CSVLink data={csvData} headers={headers} filename="edited_data.csv">
              <Button colorScheme="teal">Download Edited CSV</Button>
            </CSVLink>
          </>
        )}
      </VStack>
    </Container>
  );
};

export default CSVUploader;