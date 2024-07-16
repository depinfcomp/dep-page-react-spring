import {
  Direction,
  FloatMenuItemButton,
  FloatingGroup,
  Size,
} from "react-motion-float-button";
import "../css/FloatingButton.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

const FloatingButton = () => {
  return (
    <>
      <div className="floating-button-container">
        
        <FloatingGroup
          size={Size.REGULAR}
          direction={Direction.TOP}
          spacing={100}
        >
          <FloatMenuItemButton
            icon={<FacebookIcon size="60%" />}
            buttonColor="#4f5bd5"
            onClick={() => window.open('https://www.facebook.com', '_blank')}
          />
          <FloatMenuItemButton
            icon={<InstagramIcon size="20%" />}
            buttonColor="#3B5998"
            onClick={() => window.open('https://www.instagram.com/inforcomp_unal?igsh=bG51enk5NjVncjRv', '_blank')}
          />
        </FloatingGroup>
      </div>
    </>
  );
};

export default FloatingButton;
