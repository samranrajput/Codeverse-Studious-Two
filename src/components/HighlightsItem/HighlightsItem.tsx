import DiamondCard from "../DiamondCard/DiamondCard";

const HighlightsItem = ({
  item,
  isMobile,
}: {
  item: any;
  isMobile: boolean;
}) => {
  return (
    <div className="highlights-wrapper" data-aos={item.aos}>
      <DiamondCard item={item} isMobile={isMobile} showCounter={true} />
    </div>
  );
};

export default HighlightsItem;
