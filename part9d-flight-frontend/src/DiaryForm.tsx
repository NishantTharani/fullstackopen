import axios from "axios";
import { useState } from "react";
import { DiaryEntry } from "./types";

interface DiaryEntriesProps {
  concatDiaryEntry: (newEntry: DiaryEntry) => void;
}

const DiaryForm = ({ concatDiaryEntry }: DiaryEntriesProps) => {
  const [newDate, setNewDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const addDiaryEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    axios
      .post<DiaryEntry>("http://localhost:3000/api/diaries", {
        date: newDate,
        weather,
        visibility,
        comment,
      })
      .then((response) => {
        concatDiaryEntry(response.data);

        setNewDate("");
        setVisibility("");
        setWeather("");
        setComment("");
      })
      .catch((error) => {
        if (error.isAxiosError) {
          setErrorMsg(error.response?.data);
          console.log(error.response?.data);

          setTimeout(() => {
            setErrorMsg("");
          }, 2000);
        }
      });
  };

  return (
    <div>
      <h2>Add a new diary entry</h2>
      <p color="red">{errorMsg}</p>

      <form>
        <div>
          <label htmlFor="date">Date</label>
          <input
            type="text"
            id="date"
            name="date"
            value={newDate}
            onChange={({ target }) => setNewDate(target.value)}
          />
        </div>
        <div>
          <label htmlFor="visibility">Visibility</label>
          <input
            type="text"
            id="visibility"
            name="visibility"
            value={visibility}
            onChange={({ target }) => setVisibility(target.value)}
          />
        </div>
        <div>
          <label htmlFor="weather">Weather</label>
          <input
            type="text"
            id="weather"
            name="weather"
            value={weather}
            onChange={({ target }) => setWeather(target.value)}
          />
        </div>
        <div>
          <label htmlFor="comment">Comment</label>
          <input
            type="text"
            id="comment"
            name="comment"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <button onClick={addDiaryEntry}>Add</button>
      </form>
    </div>
  );
};

export default DiaryForm;
