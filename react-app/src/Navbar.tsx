import React, { FC, useContext, useState } from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AuthModal from './AuthModal';
// import { Context } from './App';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  }
}));

interface ModalState {
  open: boolean;
  selectedTab: null | number;
}

const NavBar: FC = () => {
  // const { user } = useContext(Context);
  const [showModal, setShowModal] = useState<ModalState>({ open: false, selectedTab: null });
  const classes = useStyles();
  const handleClick = (selectedTab: number) => (): void => {
    setShowModal(prevState => ({ open: !prevState.open, selectedTab }));
  };
  const handleClose = (): void => {
    setShowModal(prevState => ({ open: !prevState.open, selectedTab: null }));
  };
  const { open, selectedTab } = showModal;

  return (
    <>
      <Box flexGrow={1}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              MyApp
            </Typography>
            <Button color="inherit" onClick={handleClick(0)}>
              Log In
            </Button>
            <Button color="inherit" onClick={handleClick(1)}>
              Sign Up
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      {selectedTab !== null && (
        <AuthModal open={open} selectedTab={selectedTab} handleClose={handleClose} />
      )}
    </>
  );
};

export default NavBar;
