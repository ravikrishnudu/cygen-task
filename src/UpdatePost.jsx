import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  Input,
  withStyles,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";

const Styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

// const DialogTitle = withStyles(Styles)((props) => {});

function UpdatePost(props) {
  const [title, setTitle] = useState(props.post.title ? props.post.title : "");
  const [body, setBody] = useState(props.post.body ? props.post.body : "");
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    setTitle(props.post.title);
    setBody(props.post.body);
    if (title !== props.post.title || body !== props.post.body) {
      setChanged(true);
    } else {
      setChanged(false);
    }
  }, [props.post, title, body]);

  const handleClose = () => {
    props.setOpen(false);
  };
  const handleUpdatePost = () => {
    props.updatePost(props.post.id, title, body);
  };
  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.open}
        maxWidth="sm"
        fullWidth
      />
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Post Details
      </DialogTitle>

      <DialogContent>
        <FormControl fullWidth>
          <FormLabel component="legend">Title</FormLabel>
          <Input
            multiline
            value={title}
            rows={2}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth>
          <FormLabel component="legend">Body</FormLabel>
          <Input
            multiline
            rows={2}
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={handleUpdatePost}
          variant="contained"
          color="primary"
          disabled={!changed}
        >
          Update
        </Button>
        <Button variant="contained" color="secondary" onClick={handleClose}>
          CANCEL
        </Button>
      </DialogActions>
    </>
  );
}

export default UpdatePost;
