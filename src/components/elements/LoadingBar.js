import ProgressBar from "@ramonak/react-progress-bar";

export default function LoadingBar() {
  return (
    <ProgressBar
      className="progress-bar"
      completed={100}
      bgColor="#0969da"
      height="4px"
      borderRadius="0"
      isLabelVisible={false}
      labelColor="#e80909"
      transitionDuration="200ms"
      animateOnRender
    />
  );
}
