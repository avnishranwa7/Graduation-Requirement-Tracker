import { useTable } from 'react-table';
import React, {useState} from 'react';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import styled from "styled-components";
import ModalUnstyled from '@mui/base/ModalUnstyled';

import AddCourseModal from './AddCourse';

const Styles = styled.div`
  padding: 1rem;
  width: fit-content;
  margin: auto;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      background-color: rgb(220, 227, 240);

      :last-child {
        border-right: 0;
      }
    }

  }
`

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  bgcolor: 'white',
  border: '1px solid',
  borderRadius: '5px',
  p: 2,
  px: 4,
  pb: 3,
};

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()} style={{backgroundColor: "rgb(1, 29, 67)", color: "white", fontWeight: "500"}}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

const TableView = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Course Code',
        accessor: 'course_code'
      },
      {
        Header: 'Course Name',
        accessor: 'course_name'
      },
      {
        Header: 'Counted Towards',
        accessor: 'counted_towards'
      },
      {
        Header: 'Credits',
        accessor: 'credits'
      },
    ],
    []
  )
  const data = [{course_code: 'ES654', course_name: 'Machine Learning', counted_towards: '-', credits: 4},
                {course_code: 'MA504', course_name: 'Linear Algebra', counted_towards: '-', credits: 4}]
  
  const [open, setOpen] = React.useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Styles>
      <Table columns={columns} data={data} />
      <ButtonGroup>
        <Button variant='outlined' onClick={handleOpen} style={{marginRight: "35px"}}>Add Course</Button>
        <Button variant='outlined' color='error'>Drop Course</Button>
      </ButtonGroup>
      <Modal>
        <StyledModal
          aria-labelledby="unstyled-modal-title"
          aria-describedby="unstyled-modal-description"
          open={open}
          onClose={handleClose}
          BackdropComponent={Backdrop}
        >
          <Box sx={style}>
            <AddCourseModal />
          </Box>
        </StyledModal>
      </Modal>
    </Styles>
  )
}

const ButtonGroup = styled.div`
  margin-top: 20px;
  justify-content: center;
  display: flex;
`;

const Modal = styled.div`
`;

export default TableView;