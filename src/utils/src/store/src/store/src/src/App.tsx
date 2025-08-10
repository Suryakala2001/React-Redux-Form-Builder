import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography, Button } from '@mui/material';
import CreateForm from './components/Builder/CreateForm';
import PreviewForm from './components/Preview/PreviewForm';
import MyForms from './components/MyForms/MyForms';

export default function App() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Form Builder
          </Typography>
          <Button component={Link} to="/create" color="inherit">
            Create
          </Button>
          <Button component={Link} to="/preview" color="inherit">
            Preview
          </Button>
          <Button component={Link} to="/myforms" color="inherit">
            My Forms
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 3 }}>
        <Routes>
          <Route path="/" element={<CreateForm />} />
          <Route path="/create" element={<CreateForm />} />
          <Route path="/preview" element={<PreviewForm />} />
          <Route path="/myforms" element={<MyForms />} />
          <Route path="/preview/:id" element={<PreviewForm />} />
        </Routes>
      </Container>
    </div>
  );
}
