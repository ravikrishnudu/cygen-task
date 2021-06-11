import React, { useEffect, useState } from "react";

import {
  Button,
  Dialog,
  FormControl,
  FormLabel,
  DialogActions,
  DialogTitle,
  DialogContent,
  Input,
} from "@material-ui/core";

function PostUpdate({ open, post, setOpen, updatePost }) {
  const [title, setTitle] = useState(post.title ? post.title : "");
  const [body, setBody] = useState(post.body ? post.body : "");
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    setTitle(post.title);
    setBody(post.body);
  }, [post]);

  useEffect(() => {
    if (title !== post.title || body !== post.body) {
      setChanged(true);
    } else {
      setChanged(false);
    }
  }, [title, body, post]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdatePost = () => {
    updatePost(post.id, title, body);
    setOpen(false);
  };
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth="sm"
      fullWidth
    >
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
    </Dialog>
  );
}

export default PostUpdate;
