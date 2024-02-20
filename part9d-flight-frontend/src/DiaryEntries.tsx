import { DiaryEntry } from "./types";

interface DiaryEntriesProps {
  diaryEntries: DiaryEntry[];
}

const DiaryEntries = ({ diaryEntries }: DiaryEntriesProps) => {
  return (
    <div>
      <h2>Diary entries</h2>
      {diaryEntries.map((entry) => (
        <div key={entry.id}>
          <h3>{entry.date}</h3>
          <p>visibility: {entry.visibility}</p>
          <p>weather: {entry.weather}</p>
        </div>
      ))}
    </div>
  );
};

export default DiaryEntries;
