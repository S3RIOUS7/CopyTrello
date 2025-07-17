import { HELP_FOOTER_BUTTONS, HELP_IMAGES, IMAGE_CAPTIONS } from "../../../../utils/constants/headerConstants/helpConstants";
import Button from "../../../base/button/Button";

interface HelpMenuDropdownProps {
  currentImage: string;
}

const HelpMenuDropdown = ({ currentImage }: HelpMenuDropdownProps) => {
  
  const imageIndex = HELP_IMAGES.indexOf(currentImage);

  const caption = imageIndex !== -1 ? IMAGE_CAPTIONS[imageIndex] : '';

  return (
    <div className="help-drop-menu"> 
      <div className="help-menu-item">
        <div className="help-content-wrapper">
          <img 
            src={currentImage} 
            srcSet={`${currentImage} 1x, ${currentImage} 2x`} 
            alt="Trello info" 
            className="fixed-size-help-image"
          />
          <div className="fixed-width-caption">
            {caption}
          </div>
        </div>
      </div>
      <div className="help-menu-footer">
        {HELP_FOOTER_BUTTONS.map((text, index) => (
          <Button key={index} buttonStyle="icon" type="button" className="help-footer-button">
            {text}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default HelpMenuDropdown;