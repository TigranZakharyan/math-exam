import React from 'react';
import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Link,
} from '@mui/material';
import Image from 'mui-image';
// components
import Iconify from '../components/iconify/Iconify';
import Scrollbar from '../components/scrollbar/Scrollbar';
// api
import { deleteMany, fetchAll, create, deleteOne } from 'src/api/books';
import { CreateBookDialog, BooksListHead, BooksListToolbar } from 'src/sections/@dashboard/books';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'titile', label: 'Title', alignRight: false },
  { id: 'description', label: 'Description', alignRight: false },
  { id: 'author', label: 'Author', alignRight: false },
  { id: 'file', label: 'File', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (book) => book.title.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function BooksPage() {
  const [books, setBooks] = React.useState([]);

  const [open, setOpen] = React.useState(null);

  const [page, setPage] = React.useState(0);

  const [order, setOrder] = React.useState('asc');

  const [selected, setSelected] = React.useState([]);

  const [orderBy, setOrderBy] = React.useState('title');

  const [filterValue, setFilterValue] = React.useState('');

  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [newBookDialog, setNewBookDialog] = React.useState(false);


  const handleOpenMenu = (event, id) => {
    setOpen({ element: event.target, id });
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (_event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = books.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (_event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleDeleteMany = React.useCallback(() => {
    deleteMany(selected)
    .then(() => {
      setBooks((prev) => [...prev].filter(({ id }) => !selected.includes(id)));
      setSelected([]);
    })
    .catch(() => setSelected([]));
  }, [selected]);

  const handleDeleteOne = React.useCallback(() => {
    deleteOne(open.id)
    .then(() => {
      setBooks((prev) => [...prev].filter(({ id }) => id !== open.id));
    })
    .catch((err) => console.log(err))
    .finally(() => {
      handleCloseMenu();
      setSelected([]);
    });
  }, [open])

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByTitle = (event) => {
    setPage(0);
    setFilterValue(event.target.value);
  };

  const handleNewBookSubmit = (data) => {
    create(data)
    .then((res) => {
      setBooks((prev) => [...prev, res]);
      toggleNewBookDialog();
    })
    .catch((err) => console.log(err))
  }

  const toggleNewBookDialog = React.useCallback(() => setNewBookDialog(!newBookDialog), [newBookDialog]);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - books.length) : 0;

  const filteredBooks = applySortFilter(books, getComparator(order, orderBy), filterValue);

  const isNotFound = !filteredBooks.length && !!filterValue;

  React.useEffect(() => {
    fetchAll()
    .then((e) => setBooks(e))
    .catch(() => setBooks([]))
  }, []);
  
  return (
    <>
      <Helmet>
        <title>Books | Math-Eaxm</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Books
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={toggleNewBookDialog}
          >
            New book
          </Button>
        </Stack>

        <Card>
          <BooksListToolbar
            numSelected={selected.length}
            filterValue={filterValue}
            onFilterChange={handleFilterByTitle}
            onDelete={handleDeleteMany}
          />
              <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                  <Table>
                    <BooksListHead
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={books.length}
                      numSelected={selected.length}
                      onRequestSort={handleRequestSort}
                      onSelectAllClick={handleSelectAllClick}
                    />
                    <TableBody>
                      {filteredBooks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                        const {
                          id, title, description, author, preview, file
                        } = row;
                        const selectedBook = selected.indexOf(id) !== -1;
                        return (
                          <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedBook}>
                            <TableCell padding="checkbox">
                              <Checkbox checked={selectedBook} onChange={(event) => handleClick(event, id)} />
                            </TableCell>
                            <TableCell component="th" scope="row" padding="none">
                              <Stack direction="row" alignItems="center" spacing={2}>
                                <Typography variant="subtitle2" noWrap>
                                  {title}
                                </Typography>
                              </Stack>
                            </TableCell>

                            <TableCell align="left">{description}</TableCell>

                            <TableCell align="left">{author}</TableCell>

                            <TableCell align="left">
                              <Link href={file}>
                                <Image 
                                  src={preview}
                                  width={200}
                                  height={300}
                                  showLoading
                                />
                              </Link>
                            </TableCell>

                            <TableCell align="right">
                              <IconButton size="large" color="inherit" onClick={(event) => handleOpenMenu(event, id)}>
                                <Iconify icon="eva:more-vertical-fill" />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>

                    {isNotFound && (
                      <TableBody>
                        <TableRow>
                          <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                            <Paper
                              sx={{
                                textAlign: 'center',
                              }}
                            >
                              <Typography variant="h6" paragraph>
                                Not found
                              </Typography>

                              <Typography variant="body2">
                                No results found for &nbsp;
                                <strong>
                                  &quot;
                                  {filterValue}
                                  &quot;
                                </strong>
                                .
                                <br />
                                {' '}
                                Try checking for typos or using complete words.
                              </Typography>
                            </Paper>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    )}
                  </Table>
                </TableContainer>
              </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={books.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open?.element}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }} onClick={handleDeleteOne}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>

      { 
        newBookDialog && 
        <CreateBookDialog
          onClose={toggleNewBookDialog}
          onSubmit={handleNewBookSubmit}
        />
      }
    </>
  );
}
