import {
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
  } from "@mui/material";
  
  import { Box } from "@mui/system";
//   import HomeIcon from "@mui/icons-material/Home";
//   import SchoolIcon from "@mui/icons-material/School";
//   import BookIcon from "@mui/icons-material/Book";
//   import ResearchIcon from "@mui/icons-material/Science";
//   import InfoIcon from "@mui/icons-material/Info";
//   import EventIcon from "@mui/icons-material/Event";
  
  export default function NavListDrawer({ navLinks }) {
    return (
      <Box sx={{ width: 250 }}>
        <nav>
          <List>
            {navLinks.map((item) => (
              <ListItem disablePadding key={item.title}>
                <ListItemButton component="a" href={item.path}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText>{item.title}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </nav>
      </Box>
    );
  }
  