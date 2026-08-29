import PresenterStoryStage from "../presenter/PresenterStoryStage";
import { creatorStoryScenes } from "../../data/creatorStory";

export default function RobotCreatorStory() {
  return (
    <PresenterStoryStage
      id="story"
      scenes={creatorStoryScenes}
      endingHref="#"
      endingLabel="Continue →"
    />
  );
}
