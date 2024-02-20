import { useEffect, useState } from "react";
import { DiaryEntry } from "./types";
import axios from "axios";
import DiaryEntries from "./DiaryEntries";
import DiaryForm from "./DiaryForm";

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

  const addDiaryEntry = (newEntry: DiaryEntry) => {
    setDiaryEntries((diaryEntries) => [...diaryEntries, newEntry]);
  };

  const fetchDiaryEntries = async () => {
    const entries = await axios.get<DiaryEntry[]>(
      "http://localhost:3000/api/diaries"
    );
    setDiaryEntries(entries.data);
  };

  useEffect(() => {
    fetchDiaryEntries();
  }, []);

  return (
    <div>
      <DiaryForm concatDiaryEntry={addDiaryEntry} />
      <DiaryEntries diaryEntries={diaryEntries} />
    </div>
  );
}

export default App;
