import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "@material-ui/core/Container";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  Box,
  IconButton,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
// import SearchBar from "material-ui-search-bar";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    maxwidth: "100vw",
    backgroundColor: theme.palette.grey[100],
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));

const useSearchStyle = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    width: "25ch",
  },
}));

async function getPosts() {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  console.log(response);
  return response.data;
}
async function getUsers() {
  const res = await axios.get("https://jsonplaceholder.typicode.com/users");
  return res.data;
}
function Posts() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setrowsPerPage] = useState(5);
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackBarType, setSnackBarType] = useState("success");

  useEffect(() => {
    getPosts().then((res) => {
      setPosts(res);
    });
    getUsers().then((res) => {
      setUsers(res);
    });
  }, []);
  console.log(posts);

  const getUsersName = (id) => {
    if (id) {
      const requiredUsersArr = users.find((user) => user.id === id);
      return requiredUsersArr.name;
    }
    return "";
  };

  const onChangePage = (event, nextPage) => {
    setPage(nextPage);
  };
  const onChangeRowsPerPage = (event) => {
    setrowsPerPage(event.target.value);
  };

  const styles = useStyles();
  const searchStyles = useSearchStyle();
  console.log(posts);

  return (
    <div>
      <Container className={styles.root}>
        <TableContainer component={Paper}>
          <div style={{ width: "100%" }}>
            <Box display="flex" p={1} bgcolor="background.paper">
              <Box p={1} flexGrow={1} bgcolor="white.300">
                <h3>Posts</h3>
              </Box>
              <Box>{/* <SearchBar className={searchStyles.root} /> */}</Box>
            </Box>
          </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Posts ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Users</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {posts &&
                posts
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((post, id) => {
                    return (
                      <TableRow key={post.id}>
                        <TableCell>{post.id}</TableCell>
                        <TableCell>{post.title}</TableCell>
                        <TableCell>{getUsersName(post.userId)}</TableCell>

                        <TableCell>
                          <IconButton
                            onClick={() => {
                              setSelected(id);
                              setOpen(true);
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPage={[5, 10, 15, 25, 75, 99]}
            count={posts.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={onChangePage}
            onChangeRowsPerPage={onChangeRowsPerPage}
          />
        </TableContainer>
        <CustomizedDialogs
          open={open}
          setOpen={setOpen}
          post={Posts[selected] ? Posts[selected] : {}}
          updatePost={updatePost}
        />
        <Snackbar>
          open={showSnackBar}
          autoHideDuration={2000}
          post ={posts[selected] ? posts[selected] : {}}
          onClose={setShowSnackBar}
        </Snackbar>
      </Container>
    </div>
  );
}

export default Posts;
