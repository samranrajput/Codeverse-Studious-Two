import DiamondCard from "../DiamondCard/DiamondCard";
import "./HighlightsItem.css";

const HighlightsItem = ({
  item,
  isMobile,
}: {
  item: any;
  isMobile: boolean;
  round?: boolean;
}) => {
  return (
    <DiamondCard
      item={item}
      isMobile={isMobile}
      showCounter={true}
      // data-aos={item.aos}
      variant="highlights"
    />
  );
};

export default HighlightsItem;
