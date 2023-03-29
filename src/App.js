import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import debounce from 'lodash.debounce';
function App() {
  const [posts, setPosts] = useState([]);

  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [postPerPage, setPostPerPage] = useState(15);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    loadCharacters(searchText);
  }, []);

  const loadCharacters = debounce (async (search) => {
    setSearchText(search);
    const response = await axios.get(
      `https://api.jikan.moe/v4/characters?q=${search}&page=${page}&limit=${postPerPage}order_by=favorites&sort=desc`
    );
    setPosts(response.data.data);

    setTotalRecords(response.data.pagination.items.total);

    setPageCount(Math.ceil(response.data.pagination.items.total / postPerPage));
  },1000);

  const onPageCLick = async (event) => {
    if (event.isNext) {
      setPage(page + 1);
    } else if (event.isPrevious) {
      if (page < 0) {
        setPage(page - 1);
      }
    }
    loadCharacters(searchText);
    setPostPerPage(postPerPage);
  };

  return (
    <>
      <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-secondary">
        <a className="navbar-brand" href="https://kalkani.in/">
          <img src="/Capture.PNG" alt="" />
        </a>
      </nav>

      <div className="container  mt-5">
        <div className="row justify-content-center">
          <div className="col-xs-12 col-sm-10 col-md-8 col-lg-6">
            <h1>Search Anime Characters</h1>

            <div className="from-group">
              <input
                type="text"
                className="form-control mr-sm"
                placeholder="searching...."
                onChange={(e) => loadCharacters(e.target.value)}
              />
            </div>
            <div className="row justify-content-center">
              <p>Total {totalRecords} matching Anime record found..!</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row justify-content-center mt-5">
        <table className="table table-hover table-sm table-light w-25 p-3 ">
          <tbody>
            {posts.map((e) => (
              <tr scope="col" key={e.mal_id}>
                <th scope="col">
                  <img
                    className="w-25 p-3"
                    src={e.images.jpg.image_url}
                    alt=""
                  />
                </th>

                <th scope="col" className="w-25 p-3">
                  {" "}
                  {e.name}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ReactPaginate
        previousLabel={"<< Prev"}
        nextLabel={"next >>"}
        breakLabel={"..."}
        pageCount={pageCount}
        onPageChange={onPageCLick}
        onClick={onPageCLick}
        containerClassName={"pagination  justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-link"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-link"}
        prevRel={"prev"}
        nextLinkClassName={"page-link"}
        breakClassName={"break-me"}
        activeClassName={"active"}
      />
    </>
  );
}

export default App;
