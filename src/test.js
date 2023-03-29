import "./styles.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Pagination } from "@mui/material";
export default function App() {
  const [page, setPage] = useState(1);
  const [api, setApi] = useState([]);
  useEffect(() => {
    handleFetchData();
  }, [page]);
  const handleFetchData = async () => {
    const resData = await axios.get(
      `
      https://api.jikan.moe/v4/characters?_page=${page}&limit=15&q=saki&order_by=fav
orites&sort=desc`
    );
    const data = await resData.data;
    console.log("datas", data);
    
  };
  return (
    <div className="App">
      {api.map((val) => (
        <>
          <p>{val.title}</p>
        </>
      ))}

      <Pagination
        count={10}
        color="primary"
        onChange={(event, value) => setPage(value)}
        page={page}
      />
    </div>
  );
}
