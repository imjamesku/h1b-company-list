import Layout from "../components/Layout";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import React, { useState } from "react";
import Pagination from "@material-ui/lab/Pagination";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import useSwr from "swr";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 650,
      maxWidth: 800,
      margin: "0 auto",
    },
    pagination: {
      marginTop: "1rem",
      display: "flex",
      justifyContent: "center",
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

type CompanyData = {
  CASE_COUNTS: number;
  AVG_SALARY: number;
  EMPLOYER_NAME: string;
};
const fetcher = (
  url: string,
  rowsPerPage: number,
  page: number,
  sortedBy: string
) =>
  axios
    .get(
      url +
        `?limit=${rowsPerPage}&offset=${
          page * rowsPerPage
        }&sorted_by=${sortedBy}`
    )
    .then((res) => res.data);
const countFetcher = (url: string) =>
  axios.get(url).then((res) => res.data.count);
const IndexPage = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [sortedBy, setSortedBy] = useState("caseCount");

  const { data: rows, error } = useSwr<CompanyData[]>(
    [`/api/h1b/2019`, rowsPerPage, page, sortedBy],
    fetcher
  );
  const { data: totalCount, error: countError } = useSwr<number>(
    `/api/h1b/2019/page`,
    countFetcher
  );

  const classes = useStyles();
  if (error) {
    return <p>{error}</p>;
  }
  if (countError) {
    return <p>Could not fetch the page count</p>;
  }
  if (!rows) {
    return <p>loading...</p>;
  }
  console.log(rows);
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>Hello Next.js 👋</h1>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="rows-per-page-label">rows per page</InputLabel>
        <Select
          labelId="rows-per-page-label"
          id="rows-per-page"
          value={rowsPerPage}
          onChange={(e) => setRowsPerPage(e.target.value as number)}
          label="rows per page"
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="sorted-by-label">sorted by</InputLabel>
        <Select
          labelId="sorted-by-label"
          id="sorted-by"
          value={sortedBy}
          onChange={(e) => setSortedBy(e.target.value as string)}
          label="sorted by"
        >
          <MenuItem value="caseCount">case count</MenuItem>
          <MenuItem value="avgSalary">average salary</MenuItem>
        </Select>
      </FormControl>
      <Paper>
        <TableContainer>
          <Table className={classes.table} aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>company name</TableCell>
                <TableCell align="right">average salary($)</TableCell>
                <TableCell align="right">case count</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell component="th" scope="row">
                    {row.EMPLOYER_NAME}
                  </TableCell>
                  <TableCell align="right">
                    {Math.floor(row.AVG_SALARY)}
                  </TableCell>
                  <TableCell align="right">{row.CASE_COUNTS}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <div className={classes.pagination}>
        <Pagination
          color="primary"
          count={Math.ceil((totalCount as number) / rowsPerPage)}
          page={page + 1}
          onChange={(_, newPage) => setPage(newPage - 1)}
        />
      </div>
    </Layout>
  );
};

export default IndexPage;
