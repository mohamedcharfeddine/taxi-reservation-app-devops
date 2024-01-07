import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,Button } from '@mui/material';
import { getAllMessage } from 'src/pages/api/appConfig';
import PaginationComponent from '../pagination/pagination';

const MessageList = () => {
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await getAllMessage(page, limit);
        
        setMessages(response.contacts);
        setTotalPages(response.totalPages);

      } catch (error) {
        console.error('Failed to fetch messages', error);
      }
    }

    fetchMessages();
  }, [page, limit]);


  const handlePageChange = (newPage) => {
    setPage(newPage);

  };

  return (
    <div>
      <h2>Message List</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Message</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {messages.map((message, index) => (
              <TableRow key={index}>
                <TableCell width={200} >{message.name}</TableCell>
                <TableCell width={300}>{message.email}</TableCell>
                <TableCell width={200}>{message.phoneNumber}</TableCell>
                <TableCell >{message.message}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <PaginationComponent
        totalPages={totalPages}
        currentPage={page}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default MessageList;
