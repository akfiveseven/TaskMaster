import React from 'react';
import { Avatar, Typography, LinearProgress, Box } from '@mui/material';

const ProfileXP = ({ profileImage, name, level, xp, xpNeeded, title }) => {
  // Calculate xp progress in percentage
  const xpProgress = (xp / xpNeeded) * 100;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{
        width: 500,
        mt: 2,  // added margin top to push the component down
        '.xpContainer': { 
          display: 'flex', 
          flexDirection: 'column', 
          width: '100%', 
          position: 'relative',
          mb: 2,
        },
        '.avatarContainer': {
          display: 'flex',
          alignItems: 'center',
          position: 'absolute',
          right: 0,
          top: '-15px',
          gap: '10px', // added gap between name and avatar
        },
        '.avatar': { 
          width: 30, 
          height: 30, 
        },
        '.levelAndBar': { 
          display: 'flex', 
          flexDirection: 'column', 
          flexGrow: 1,
        },
        '.level': {
          alignSelf: 'flex-start',
        },
        '.title': {
          textAlign: 'right',
        },
        '.xpBar': { 
          flexGrow: 1, 
        }
      }}
    >
      <Box className='xpContainer'>
        <Box className='avatarContainer'>
          <Typography variant="body1">{name}</Typography>
          <Avatar src={profileImage} className='avatar' />
        </Box>
        <Box className='levelAndBar'>
          <Typography variant="subtitle2" className="level">Level {level}</Typography>
          <LinearProgress variant="determinate" value={xpProgress} className='xpBar' />
        </Box>
      </Box>
      <Typography variant="body2" className='title'>{title}</Typography>
    </Box>
  );
};

export default ProfileXP;
