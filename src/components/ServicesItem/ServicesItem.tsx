import DiamondCard from "../DiamondCard/DiamondCard";
import "./ServicesItem.css";

const ServicesItem = ({ item, isMobile }: { item: any; isMobile: boolean }) => {
  return (
    <DiamondCard
      item={item}
      isMobile={isMobile}
      showCounter={false}
      data-aos={item.aos}
      variant="services"
    />
  );
};

export default ServicesItem;
