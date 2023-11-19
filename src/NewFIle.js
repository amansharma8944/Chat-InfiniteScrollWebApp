import React from 'react';
import { Paper, IconButton, Box } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import VideocamIcon from '@mui/icons-material/Videocam';
import DownloadIcon from '@mui/icons-material/Download';

const IconToolbar = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2 }}>
      <Paper elevation={3} sx={{ display: 'flex', borderRadius: '50px', p: 2, backgroundColor: 'green' }}>
        <IconButton color="primary" aria-label="take photo">
          <PhotoCameraIcon  sx={{color:"white"}}/>
        </IconButton>
        <IconButton color="primary" aria-label="record video">
          <VideocamIcon />
        </IconButton>
        <IconButton color="primary" aria-label="download">
          <DownloadIcon />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default IconToolbar;
