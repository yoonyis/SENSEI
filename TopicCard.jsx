import MasteryBar from "./MasteryBar";

function TopicCard({ topic }) {
  return (
    <div className="topic-card">

      <div className="topic-header">

        <div className="topic-icon">
          {topic.icon}
        </div>

        <div>
          <h3>{topic.name}</h3>
          <p>Learning mastery</p>
        </div>

      </div>

      <MasteryBar value={topic.mastery} />

    </div>
  );
}

export default TopicCard;