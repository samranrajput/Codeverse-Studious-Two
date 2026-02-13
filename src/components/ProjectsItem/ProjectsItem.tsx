import DiamondCard from "../DiamondCard/DiamondCard";
import "./ProjectsItem.css";

const ProjectsItem = ({
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
      showCounter={false}
      showIcon={false}
      showProjectImage={true}
      btnGroup={true}
      variant="projects"
    />
  );
};

export default ProjectsItem;
